/* =========================================================
        QUIZ ENGINE (EMBEDDED EXERCISES)
========================================================= */
(() => {
    'use strict';

    function normalizeKey(key) {
        return String(key || '').trim().toLowerCase();
    }

    function escapeHTML(s) {
        return String(s)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;');
    }

    function uniqueQuizName(container) {
        if (container.dataset && container.dataset.quizId) return container.dataset.quizId;
        const id = `quiz-${Math.random().toString(36).slice(2)}`;
        if (container.dataset) container.dataset.quizId = id;
        return id;
    }

    function normalizeAnswers(arr) {
        return Array.from(new Set(arr.map(Number))).sort((a, b) => a - b);
    }

    function mount(container, topicKey, options = {}) {
        if (!container) return;

        const opts = {
            hideMoveNext: false,
            ...options
        };

        const elQn = container.querySelector('[data-qn]');
        const elTotal = container.querySelector('[data-total]');
        const elScore = container.querySelector('[data-score]');
        const elQuestion = container.querySelector('[data-question]');
        const elType = container.querySelector('[data-type]');
        const elOptions = container.querySelector('[data-options]');
        const elFeedback = container.querySelector('[data-feedback]');
        const elExplainWrap = container.querySelector('[data-explain-wrap]');
        const elExplain = container.querySelector('[data-explain]');
        const elFinished = container.querySelector('[data-finished]');
        const elCodeWrap = container.querySelector('[data-code-wrap]');
        const elCode = container.querySelector('[data-code]');
        const elActions = container.querySelector('.ex-actions');

        const btnCheck = container.querySelector('[data-action="check"], [data-role="check"]');
        const btnNext = container.querySelector('[data-action="next"], [data-role="next"]');
        const btnReset = container.querySelector('[data-action="reset"], [data-role="reset"]');
        let btnPrev = container.querySelector('[data-action="prev"], [data-role="prev"]');

        if (!btnPrev && elActions) {
            btnPrev = document.createElement('button');
            btnPrev.type = 'button';
            btnPrev.className = 'ex-btn ghost';
            btnPrev.setAttribute('data-action', 'prev');
            btnPrev.textContent = '< Previous ';
            if (btnNext && btnNext.parentElement === elActions) {
                elActions.insertBefore(btnPrev, btnNext);
            } else {
                elActions.appendChild(btnPrev);
            }
        }

        const DB =
            window.QUIZ_DATA?.QUESTIONS_BY_TOPIC ||
            window.QUESTIONS_BY_TOPIC ||
            window.PY_EXERCISE_QUESTIONS_BY_TOPIC ||
            {};

        const normalized = normalizeKey(topicKey);
        const questions = DB[topicKey] || DB[normalized] || [];

        if (!Array.isArray(questions) || questions.length === 0) {
            if (elQuestion) elQuestion.textContent = 'No questions available.';
            if (elTotal) elTotal.textContent = '0';
            if (elScore) elScore.textContent = '0';
            if (elFinished) {
                elFinished.textContent = '';
                elFinished.hidden = true;
            }
            if (btnCheck) btnCheck.hidden = true;
            if (btnNext) btnNext.hidden = true;
            if (elCodeWrap) elCodeWrap.hidden = true;
            return;
        }

        let idx = 0;
        let score = 0;
        const inputName = uniqueQuizName(container);

        function setFeedback(text, kind) {
            if (!elFeedback) return;
            elFeedback.textContent = text || '';
            elFeedback.className = kind ? `ex-feedback ${kind}` : 'ex-feedback';
        }

        function setFinished(message) {
            if (!elFinished) return;
            elFinished.textContent = message || '';
            elFinished.hidden = !message;
        }

        function clearOptionStates() {
            elOptions?.querySelectorAll('.ex-option').forEach((el) => {
                el.classList.remove('correct', 'wrong');
            });
            const textInput = elOptions?.querySelector('[data-text-answer]');
            const textWrap = textInput?.closest('.ex-option');
            if (textWrap) {
                textWrap.classList.remove('correct', 'wrong');
            }
        }

        function renderCodeBlock(item) {
            if (!elCodeWrap || !elCode) return;
            if (!item.code) {
                elCodeWrap.hidden = true;
                elCode.textContent = '';
                elCode.className = '';
                return;
            }

            const lang = String(item.lang || '').trim().toLowerCase() || 'python';
            elCode.textContent = item.code;
            elCode.className = '';
            elCode.classList.add(`language-${lang}`);
            elCodeWrap.hidden = false;

            if (window.hljs && typeof window.hljs.highlightElement === 'function') {
                elCode.removeAttribute('data-highlighted');
                window.hljs.highlightElement(elCode);
            }
        }

        function renderQuestion() {
            const item = questions[idx];
            const type = (item.type || 'mcq').toLowerCase();

            if (elQn) elQn.textContent = String(idx + 1);
            if (elTotal) elTotal.textContent = String(questions.length);
            if (elScore) elScore.textContent = String(score);
            if (elQuestion) elQuestion.textContent = item.q || '';
            if (elType) {
                if (item.type) {
                    elType.textContent = `Type: ${String(item.type).toUpperCase()}`;
                    elType.hidden = false;
                } else {
                    elType.textContent = '';
                    elType.hidden = true;
                }
            }

            if (elOptions) elOptions.innerHTML = '';
            setFeedback('');
            if (elExplainWrap) elExplainWrap.hidden = true;
            if (elExplain) elExplain.textContent = '';
            setFinished('');
            renderCodeBlock(item);

            if (type === 'text' || type === 'tf') {
                const wrap = document.createElement('label');
                wrap.className = 'ex-option';
                wrap.innerHTML = `
                    <input type="text" data-text-answer placeholder="${type === 'tf' ? 'Type true or false' : 'Type your answer'}">
                `;
                elOptions?.appendChild(wrap);
            } else {
                const inputType = type === 'msq' ? 'checkbox' : 'radio';
                item.options.forEach((opt, i) => {
                    const wrap = document.createElement('label');
                    wrap.className = 'ex-option';
                    wrap.innerHTML = `
                        <input type="${inputType}" name="${inputName}" value="${i}">
                        <span><code>${escapeHTML(opt)}</code></span>
                    `;
                    elOptions?.appendChild(wrap);
                });
            }
            if (btnCheck) btnCheck.hidden = false;
            if (btnPrev) btnPrev.hidden = idx === 0;
            if (btnNext) btnNext.hidden = true;
        }

        if (btnCheck) {
            btnCheck.addEventListener('click', () => {
                const item = questions[idx];
                const type = (item.type || 'mcq').toLowerCase();

                clearOptionStates();

                if (type === 'text') {
                    const textInput = elOptions?.querySelector('[data-text-answer]');
                    const textWrap = textInput?.closest('.ex-option');
                    const userValue = String(textInput?.value || '').trim().toLowerCase();
                    const expected = String(item.answerText || '').trim().toLowerCase();

                    if (!userValue) {
                        setFeedback('Please enter an answer.');
                        return;
                    }

                    const correctAnswer = userValue === expected;
                    if (textWrap) textWrap.classList.add(correctAnswer ? 'correct' : 'wrong');

                    if (correctAnswer) {
                        score += 1;
                        setFeedback('Correct!', 'ok');
                    } else {
                        setFeedback('Not quite.', 'bad');
                    }
                } else if (type === 'tf') {
                    const textInput = elOptions?.querySelector('[data-text-answer]');
                    const textWrap = textInput?.closest('.ex-option');
                    const userValue = String(textInput?.value || '').trim().toLowerCase();
                    const expected = String(Boolean(item.answer)).toLowerCase();

                    if (!userValue) {
                        setFeedback('Please enter an answer.');
                        return;
                    }

                    if (userValue !== 'true' && userValue !== 'false') {
                        setFeedback('Type true or false.');
                        return;
                    }

                    const correctAnswer = userValue === expected;
                    if (textWrap) textWrap.classList.add(correctAnswer ? 'correct' : 'wrong');

                    if (correctAnswer) {
                        score += 1;
                        setFeedback('Correct!', 'ok');
                    } else {
                        setFeedback('Not quite.', 'bad');
                    }
                } else if (type === 'msq') {
                    const picked = Array.from(
                        elOptions?.querySelectorAll(`input[type="checkbox"][name="${inputName}"]:checked`) || []
                    ).map((el) => Number(el.value));

                    if (!picked.length) {
                        setFeedback('Please choose an option.');
                        return;
                    }

                    const correct = normalizeAnswers(Array.isArray(item.answers) ? item.answers : []);
                    const chosen = normalizeAnswers(picked);
                    const correctAnswer = JSON.stringify(correct) === JSON.stringify(chosen);

                    elOptions?.querySelectorAll('.ex-option').forEach((el, i) => {
                        if (correct.includes(i)) el.classList.add('correct');
                        if (chosen.includes(i) && !correct.includes(i)) el.classList.add('wrong');
                    });

                    if (correctAnswer) {
                        score += 1;
                        setFeedback('Correct!', 'ok');
                    } else {
                        setFeedback('Not quite.', 'bad');
                    }
                } else {
                    const picked = elOptions?.querySelector(`input[type="radio"][name="${inputName}"]:checked`);
                    if (!picked) {
                        setFeedback('Please choose an option.');
                        return;
                    }

                    const chosen = Number(picked.value);
                    const correct = Number(item.answer);
                    const correctAnswer = chosen === correct;

                    elOptions?.querySelectorAll('.ex-option').forEach((el, i) => {
                        if (i === correct) el.classList.add('correct');
                        if (i === chosen && !correctAnswer) el.classList.add('wrong');
                    });

                    if (correctAnswer) {
                        score += 1;
                        setFeedback('Correct!', 'ok');
                    } else {
                        setFeedback('Not quite.', 'bad');
                    }
                }

                if (elScore) elScore.textContent = String(score);

                if (item.explain && elExplain) {
                    elExplain.textContent = item.explain;
                    if (elExplainWrap) elExplainWrap.hidden = false;
                }

                if (btnCheck) btnCheck.hidden = true;

                const isLast = idx === questions.length - 1;
                if (!isLast) {
                    if (btnNext) btnNext.hidden = false;
                } else {
                    setFinished(`Finished! Score: ${score}/${questions.length}`);
                    if (opts.hideMoveNext) return;
                }
            });
        }

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                if (idx < questions.length - 1) {
                    idx += 1;
                    renderQuestion();
                }
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                if (idx > 0) {
                    idx -= 1;
                    renderQuestion();
                }
            });
        }

        if (btnReset) {
            btnReset.addEventListener('click', () => {
                idx = 0;
                score = 0;
                renderQuestion();
            });
        }

        renderQuestion();
    }

    window.QuizEngine = { mount };
})();
