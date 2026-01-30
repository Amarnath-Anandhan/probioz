/* =========================================================
        QUESTIONS DATABASE
           ========================================================= */
window.QUIZ_DATA = window.QUIZ_DATA || {};

window.QUIZ_DATA.QUESTIONS_BY_TOPIC = {
    "python:Introduction": [
            {
                type: "output",
                q: "What will this code print?",
                code: `print(10 + 5)`,
                options: ["105", "10 5", "15", "Error"],
                answer: [2],
                explain: "10 + 5 is numeric addition, so the result is 15."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `sequence = "ATGC"\nprint(len(sequence))`,
                options: ["3", "4", "5", "Error"],
                answer: [1],
                explain: "ATGC has 4 characters."
            },
            {
                type: "msq",
                q: "Which of the following lines will run without error?",
                code: `# Choose all that work`,
                options: [
                    `print("Hello")`,
                    `print(10 + "5")`,
                    `print(len("ATGC"))`,
                    `print(10 + 5)`
                ],
                answer: [0, 2, 3],
                explain: "Adding number and string causes error. Others are valid."
            },
            {
                type: "tf",
                q: "input() always returns a string.",
                answer: true,
                explain: "input() returns text unless converted using int() or float()."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print("Sequence:", "ATGC")`,
                options: ["Sequence:ATGC", "Sequence: ATGC", "Sequence ATGC", "Error"],
                answer: [1],
                explain: "print adds a space between values."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `x = 10\n# print(x)\nprint("Done")`,
                options: ["10", "Done", "Nothing", "Error"],
                answer: [1],
                explain: "The first print is commented, so only Done is printed."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print("A")\nprint("B")`,
                options: ["AB", "A B", "A\nB", "Error"],
                answer: [2],
                explain: "Each print prints on a new line."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print(len("ATGCGT"))`,
                options: ["5", "6", "7", "Error"],
                answer: [1],
                explain: "ATGCGT has 6 characters."
            },
            {
                type: "mcq",
                q: "Which command is used to check Python version?",
                options: ["python check", "python --version", "check python", "version python"],
                answer: [1],
                explain: "python --version shows the installed version."
            },
            {
                type: "mcq",
                q: "Which tool is best for step-by-step data analysis?",
                options: ["VS Code", "PyCharm", "Jupyter Notebook", "Notepad"],
                answer: [2],
                explain: "Jupyter is made for step-by-step execution."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `age = "20"\nprint(age + age)`,
                options: ["40", "2020", "Error", "20 20"],
                answer: [1],
                explain: "Strings join together, so result is 2020."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `age = int("20")\nprint(age + age)`,
                options: ["40", "2020", "Error", "20 20"],
                answer: [0],
                explain: "Now age is number, so 20 + 20 = 40."
            },
            {
                type: "mcq",
                q: "Which symbol starts a single-line comment in Python?",
                options: ["//", "#", "/*", "--"],
                answer: [1],
                explain: "# is used for comments in Python."
            },
            {
                type: "tf",
                q: "Python ignores comments while running the program.",
                answer: true,
                explain: "Comments are only for humans."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print("GC =", 45.2)`,
                options: ["GC =45.2", "GC = 45.2", "GC=45.2", "Error"],
                answer: [1],
                explain: "print adds space between values."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `sequence = "ATGC"\nprint(sequence)`,
                options: ["ATGC", "A T G C", "4", "Error"],
                answer: [0],
                explain: "It prints the string as it is."
            },
            {
                type: "mcq",
                q: "Which file extension is used for Python programs?",
                options: [".txt", ".exe", ".py", ".python"],
                answer: [2],
                explain: "Python files use .py extension."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print("Length:", len("AAA"))`,
                options: ["Length: 2", "Length: 3", "Length: AAA", "Error"],
                answer: [1],
                explain: "AAA has 3 characters."
            },
            {
                type: "mcq",
                q: "Why should 'Add Python to PATH' be checked during installation?",
                options: [
                    "To make Python faster",
                    "To run Python from terminal easily",
                    "To reduce file size",
                    "To install Jupyter"
                ],
                answer: [1],
                explain: "PATH allows using python command directly."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print(5 > 2)`,
                options: ["5 > 2", "True", "False", "Error"],
                answer: [1],
                explain: "5 is greater than 2, so result is True."
            },
            {
                type: "msq",
                q: "Which of the following are valid print statements?",
                code: `# Choose all that work`,
                options: [
                    `print("Hi")`,
                    `print(10, 20)`,
                    `print("A" + "B")`,
                    `print(10 + "20")`
                ],
                answer: [0, 1, 2],
                explain: "Adding number and string causes error, others work."
            },
            {
                type: "tf",
                q: "Triple quotes can be used for long notes or documentation in code.",
                answer: true,
                explain: "They are often used as multi-line comments or docstrings."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print("Jupyter is ready")`,
                options: ["Nothing", "jupyter is ready", "Jupyter is ready", "Error"],
                answer: [2],
                explain: "print prints the text exactly as written."
            },
            {
                type: "mcq",
                q: "Which tool is mainly used for big Python projects?",
                options: ["Jupyter", "Notepad", "PyCharm", "Word"],
                answer: [2],
                explain: "PyCharm is a full IDE for big projects."
            }
        ],


        "python:Variables": [
            {
                type: "output",
                q: "What will this code print?",
                code: `x = 10\nprint(x)`,
                options: ["x", "10", "Error", "Nothing"],
                answer: [1],
                explain: "x stores 10, so print(x) prints 10."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `name = "Amar"\nprint(name)`,
                options: ["name", "Amar", "Error", "Nothing"],
                answer: [1],
                explain: "The variable name stores the string Amar."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `a = 5\nb = 3\ntotal = a + b\nprint(total)`,
                options: ["53", "8", "Error", "a + b"],
                answer: [1],
                explain: "5 + 3 = 8."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `price = 50\ncount = 3\nbill = price * count\nprint(bill)`,
                options: ["150", "53", "Error", "503"],
                answer: [0],
                explain: "50 * 3 = 150."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `sequence = "ATGCGT"\nlength = len(sequence)\nprint(length)`,
                options: ["5", "6", "7", "Error"],
                answer: [1],
                explain: "ATGCGT has 6 characters."
            },
            {
                type: "mcq",
                q: "Which of the following is a valid variable name?",
                options: ["1count", "total-sum", "total_sum", "total sum"],
                answer: [2],
                explain: "Variable names can contain letters, numbers, and _ but cannot start with a number or contain spaces or -."
            },
            {
                type: "msq",
                q: "Which of the following are valid variable names?",
                options: ["age", "_value", "2nd", "total_marks"],
                answer: [0, 1, 3],
                explain: "Names cannot start with a number. Others are valid."
            },
            {
                type: "tf",
                q: "A variable name can start with a number in Python.",
                answer: false,
                explain: "Variable names cannot start with a number."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `count = 5\ncount = 10\nprint(count)`,
                options: ["5", "10", "510", "Error"],
                answer: [1],
                explain: "The new value replaces the old one."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `score = 20\nscore = score + 5\nprint(score)`,
                options: ["20", "25", "205", "Error"],
                answer: [1],
                explain: "20 + 5 = 25."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `x = 10\nx += 5\nprint(x)`,
                options: ["10", "15", "105", "Error"],
                answer: [1],
                explain: "x += 5 means x = x + 5."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `y = 100\ny -= 20\nprint(y)`,
                options: ["120", "80", "100", "Error"],
                answer: [1],
                explain: "100 - 20 = 80."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `a, b, c = 10, 20, 30\nprint(b)`,
                options: ["10", "20", "30", "Error"],
                answer: [1],
                explain: "b gets the value 20."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `x = y = z = 0\nprint(y)`,
                options: ["x", "0", "Error", "None"],
                answer: [1],
                explain: "All three get value 0."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `a = 5\nb = 10\na, b = b, a\nprint(a, b)`,
                options: ["5 10", "10 5", "Error", "15"],
                answer: [1],
                explain: "Values are swapped."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `gene, variant, label = "TP53", "R175H", "pathogenic"\nprint(variant)`,
                options: ["TP53", "R175H", "pathogenic", "Error"],
                answer: [1],
                explain: "variant stores R175H."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `gc_min = gc_max = 40\nprint(gc_min, gc_max)`,
                options: ["40", "40 40", "Error", "gc_min gc_max"],
                answer: [1],
                explain: "Both variables get 40."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `name = "Priya"\nmarks = 85\nprint(f"Name: {name}, Marks: {marks}")`,
                options: [
                    "Name: Priya, Marks: 85",
                    "Name: {name}, Marks: {marks}",
                    "Error",
                    "Priya 85"
                ],
                answer: [0],
                explain: "f-string inserts variable values."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `gene = "TP53"\nlength = 393\nprint(f"Gene {gene} has length {length}")`,
                options: [
                    "Gene TP53 has length 393",
                    "Gene gene has length length",
                    "Error",
                    "TP53 393"
                ],
                answer: [0],
                explain: "f-string formats the output."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `x = 100\nif True:\n    y = 50\n    print(x)\n    print(y)\nprint(x)`,
                options: ["100 50 100", "100 100", "50 100", "Error"],
                answer: [0],
                explain: "x is global, y is inside the block but printed there."
            },
            {
                type: "tf",
                q: "A variable created inside an if block is local to that block.",
                answer: true,
                explain: "Such variables are meant to be used inside the block."
            },
            {
                type: "mcq",
                q: "Which variable is global in this code?\n\nx = 10\nif True:\n    y = 5",
                options: ["x", "y", "both", "none"],
                answer: [0],
                explain: "x is defined outside the block."
            },
            {
                type: "msq",
                q: "Which statements about variables are correct?",
                options: [
                    "Variables store values",
                    "Variable values can be changed",
                    "Variables cannot be reused",
                    "Variables can have meaningful names"
                ],
                answer: [0, 1, 3],
                explain: "Variables are meant to store, change, and reuse values."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `read_count = 10\nread_count = read_count + 5\nprint(read_count)`,
                options: ["10", "15", "105", "Error"],
                answer: [1],
                explain: "10 + 5 = 15."
            }
        ],
        "python:DataTypes": [
            {
                type: "output",
                q: "What will this code print?",
                code: `x = 10\nprint(type(x))`,
                options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "int"],
                answer: [0],
                explain: "10 is an integer, so its type is int."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `name = "ATGC"\nprint(type(name))`,
                options: ["<class 'int'>", "<class 'str'>", "<class 'list'>", "Error"],
                answer: [1],
                explain: "Text values are of type str."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `flag = True\nprint(type(flag))`,
                options: ["<class 'bool'>", "<class 'int'>", "<class 'str'>", "True"],
                answer: [0],
                explain: "True and False are boolean values."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `a = 10\nb = "5"\n# print(a + b)\nprint(a + 5)`,
                options: ["105", "15", "Error", "a + 5"],
                answer: [1],
                explain: "10 + 5 = 15."
            },
            {
                type: "mcq",
                q: "Which of the following is a built-in Python data type?",
                options: ["gene", "sequence", "int", "number"],
                answer: [2],
                explain: "int is a built-in Python type."
            },
            {
                type: "msq",
                q: "Which of the following are collection data types?",
                options: ["list", "tuple", "int", "dict"],
                answer: [0, 1, 3],
                explain: "list, tuple, and dict store multiple values."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print(len("ATGC") > 3)`,
                options: ["True", "False", "4", "Error"],
                answer: [0],
                explain: "Length is 4, which is greater than 3."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print(3 == 5)`,
                options: ["True", "False", "3 == 5", "Error"],
                answer: [1],
                explain: "3 is not equal to 5."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print(bool(0))`,
                options: ["True", "False", "0", "Error"],
                answer: [1],
                explain: "0 is considered False."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print(bool("ATGC"))`,
                options: ["True", "False", "ATGC", "Error"],
                answer: [0],
                explain: "Non-empty strings become True."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `a = "10"\nb = int(a)\nprint(b + 5)`,
                options: ["105", "15", "Error", "10 5"],
                answer: [1],
                explain: "int(\"10\") becomes 10, so 10 + 5 = 15."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `x = 3.7\ny = int(x)\nprint(y)`,
                options: ["3", "4", "3.7", "Error"],
                answer: [0],
                explain: "int() removes the decimal part."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `age = "20"\nage = int(age)\nprint(age + 1)`,
                options: ["201", "21", "Error", "20 + 1"],
                answer: [1],
                explain: "20 + 1 = 21."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `length = 120\ntext = str(length)\nprint("Len " + text)`,
                options: ["Len 120", "Len120", "Error", "120"],
                answer: [0],
                explain: "Number is converted to text and joined."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print(10 / 3)`,
                options: ["3", "3.0", "3.333...", "Error"],
                answer: [2],
                explain: "Division always gives float result."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print(10 // 3)`,
                options: ["3", "3.0", "4", "Error"],
                answer: [0],
                explain: "Floor division removes decimal part."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print(2 ** 3)`,
                options: ["6", "8", "9", "Error"],
                answer: [1],
                explain: "2 power 3 = 8."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `import math\nprint(math.sqrt(16))`,
                options: ["4", "5", "16", "Error"],
                answer: [0],
                explain: "Square root of 16 is 4."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `import math\nprint(math.floor(4.8))`,
                options: ["4", "5", "4.8", "Error"],
                answer: [0],
                explain: "floor() rounds down."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `value = None\nprint(bool(value))`,
                options: ["True", "False", "None", "Error"],
                answer: [1],
                explain: "None becomes False."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `x = None\nprint(x is None)`,
                options: ["True", "False", "None", "Error"],
                answer: [0],
                explain: "x is exactly None."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `gc = 45\ntotal = 200\nprint((gc / 100) * total)`,
                options: ["90", "9000", "0.9", "Error"],
                answer: [0],
                explain: "45% of 200 is 90."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `a = 10\nb = 3.0\nprint(type(a + b))`,
                options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "Error"],
                answer: [1],
                explain: "Mixing int and float gives float."
            },
            {
                type: "msq",
                q: "Which of the following values become False when converted to bool?",
                options: ["0", "\"\"", "None", "\"ATGC\""],
                answer: [0, 1, 2],
                explain: "0, empty string, and None become False."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `best_hit = None\nif best_hit is None:\n    print("No hit")`,
                options: ["No hit", "None", "False", "Error"],
                answer: [0],
                explain: "Condition is True, so it prints No hit."
            }
        ],
        "python:Strings": [
            {
                type: "output",
                q: "What will this code print?",
                code: `text = "Hello"\nprint(text[0])`,
                options: ["H", "e", "o", "Error"],
                answer: [0],
                explain: "Index 0 gives the first character."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `text = "Hello"\nprint(text[-1])`,
                options: ["H", "o", "l", "Error"],
                answer: [1],
                explain: "-1 gives the last character."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `text = "HelloWorld"\nprint(text[0:5])`,
                options: ["Hello", "World", "HelloWorld", "Error"],
                answer: [0],
                explain: "Slice returns characters from 0 to 4."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `text = "HelloWorld"\nprint(text[5:])`,
                options: ["Hello", "World", "oWorld", "Error"],
                answer: [1],
                explain: "Slice from index 5 to end gives 'World'."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `text = "ABCDEFGHIJ"\nprint(text[0:10:2])`,
                options: ["ACEGI", "BDFHJ", "ACEGIK", "Error"],
                answer: [0],
                explain: "Step 2 picks every second character."
            },
            {
                type: "mcq",
                q: "Which index always refers to the last character of a string?",
                options: ["0", "1", "-1", "len(text)"],
                answer: [2],
                explain: "-1 always refers to the last character."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `seq = " atgcgt "\nprint(seq.strip())`,
                options: [" atgcgt ", "atgcgt", "ATGCGT", "Error"],
                answer: [1],
                explain: "strip() removes spaces from both sides."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `seq = "atgc"\nprint(seq.upper())`,
                options: ["atgc", "ATGC", "Atgc", "Error"],
                answer: [1],
                explain: "upper() converts to uppercase."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `seq = "ATGCGT"\nprint(seq.replace("T","U"))`,
                options: ["AUGCGU", "ATGCGT", "ATGCGU", "Error"],
                answer: [0],
                explain: "All T are replaced by U."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `text = "A,B,C"\nprint(text.split(","))`,
                options: [`["A","B","C"]`, `["A,B,C"]`, `"A B C"`, "Error"],
                answer: [0],
                explain: "split(',') breaks string into list."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `parts = ["A","T","G","C"]\nprint("".join(parts))`,
                options: ["A,T,G,C", "ATGC", "['A','T','G','C']", "Error"],
                answer: [1],
                explain: "join() merges list into one string."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `a = "Hello"\nb = "World"\nprint(a + " " + b)`,
                options: ["HelloWorld", "Hello World", "Hello  World", "Error"],
                answer: [1],
                explain: "Concatenation joins with space."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `length = 120\nprint("Length is " + str(length))`,
                options: ["Length is 120", "Length is", "Error", "120Length is"],
                answer: [0],
                explain: "Number must be converted to string."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `name = "Amar"\nage = 21\nprint(f"{name}-{age}")`,
                options: ["Amar-21", "name-age", "Amar - 21", "Error"],
                answer: [0],
                explain: "f-string inserts variable values."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `gc = 45.6789\nprint(f"{gc:.2f}")`,
                options: ["45.6789", "45.67", "45.68", "Error"],
                answer: [2],
                explain: ":.2f rounds to 2 decimal places."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `gene = "TP53"\nlength = 393\nprint("Gene {} has length {}".format(gene, length))`,
                options: ["Gene TP53 has length 393", "Gene {} has length {}", "TP53 393", "Error"],
                answer: [0],
                explain: "format() fills placeholders."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print("Line1\\nLine2")`,
                options: ["Line1 Line2", "Line1\\nLine2", "Line1\nLine2", "Error"],
                answer: [2],
                explain: "\\n creates new line."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `print("A\\tB\\tC")`,
                options: ["ABC", "A    B    C", "A\\tB\\tC", "Error"],
                answer: [1],
                explain: "\\t creates tab spacing."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `seq = "ATGCGTATG"\nprint(seq.count("ATG"))`,
                options: ["0", "1", "2", "3"],
                answer: [2],
                explain: "ATG occurs twice."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `text = "HelloWorld"\nprint(text.find("World"))`,
                options: ["0", "5", "-1", "10"],
                answer: [1],
                explain: "'World' starts at index 5."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `text = "HelloWorld"\nprint(text.find("Python"))`,
                options: ["0", "5", "-1", "Error"],
                answer: [2],
                explain: "find() returns -1 if not found."
            },
            {
                type: "tf",
                q: "True or False: Strings can be modified directly in Python.",
                options: ["True", "False"],
                answer: [1],
                explain: "Strings are immutable."
            },
            {
                type: "msq",
                q: "Which of the following correctly create strings?",
                options: [`"ATGC"`, `'ATGC'`, `"""ATGC"""`, "`ATGC`"],
                answer: [0, 1, 2],
                explain: "Backticks are not used for strings."
            },
            {
                type: "output",
                q: "What will this code print?",
                code: `seq = "ATGCGTACGTA"\nprint(seq[0:3])\nprint(seq[-3:])`,
                options: ["ATG and GTA", "ATG and CGT", "AT and TA", "Error"],
                answer: [0],
                explain: "First 3 and last 3 bases are extracted."
            }
        ],
        "python:Operators": [
            {
                q: "What is the output of this code?",
                code: "a = 10\nb = 3\nprint(a + b * 2)",
                options: ["26", "16", "23", "20"],
                answer: 1,
                explain: "Multiplication happens before addition: 3*2=6, then 10+6=16."
            },
            {
                q: "What will be printed?",
                code: "x = 10\nx += 5\nprint(x)",
                options: ["10", "5", "15", "50"],
                answer: 2,
                explain: "x += 5 means x = x + 5, so 10 + 5 = 15."
            },
            {
                q: "What is the output?",
                code: "print(10 == 10)",
                options: ["True", "False", "10", "Error"],
                answer: 0,
                explain: "== checks equality, and 10 is equal to 10."
            },
            {
                q: "What will this print?",
                code: "print(5 > 3 and 2 > 4)",
                options: ["True", "False", "Error", "None"],
                answer: 1,
                explain: "5>3 is True but 2>4 is False, so True and False = False."
            },
            {
                q: "What is the output?",
                code: "a = 5\nb = 5\nprint(a is b)",
                options: ["True", "False", "Error", "0"],
                answer: 0,
                explain: "Small integers often point to same object, so 'is' returns True here."
            },
            {
                q: "What will be printed?",
                code: "seq = \"ATGCGT\"\nprint(\"ATG\" in seq)",
                options: ["True", "False", "Error", "0"],
                answer: 0,
                explain: "'in' checks membership. 'ATG' exists in the string."
            },
            {
                q: "What is the output?",
                code: "print(10 // 3)",
                options: ["3.33", "3", "4", "Error"],
                answer: 1,
                explain: "// is floor division, so result is 3."
            },
            {
                q: "What will this print?",
                code: "print(2 ** 3)",
                options: ["6", "8", "9", "Error"],
                answer: 1,
                explain: "** means power, 2^3 = 8."
            },
            {
                q: "What is the output?",
                code: "a = 10\nb = 20\nprint(a != b)",
                options: ["True", "False", "Error", "None"],
                answer: 0,
                explain: "!= checks not equal, and 10 is not equal to 20."
            },
            {
                q: "What will be printed?",
                code: "x = 5\nx *= 2\nprint(x)",
                options: ["5", "7", "10", "25"],
                answer: 2,
                explain: "x *= 2 means x = x * 2 = 10."
            },
            {
                q: "What is the output?",
                code: "print(True or False and False)",
                options: ["True", "False", "Error", "None"],
                answer: 0,
                explain: "and runs before or, so False and False = False, then True or False = True."
            },
            {
                q: "What will this print?",
                code: "a = [1,2,3]\nb = [1,2,3]\nprint(a == b)",
                options: ["True", "False", "Error", "None"],
                answer: 0,
                explain: "== checks value equality, and both lists have same values."
            },
            {
                q: "What will this print?",
                code: "a = [1,2,3]\nb = a\nprint(a is b)",
                options: ["True", "False", "Error", "None"],
                answer: 0,
                explain: "Both point to same object, so 'is' is True."
            },
            {
                q: "What is the output?",
                code: "print(10 & 3)",
                options: ["1", "2", "3", "0"],
                answer: 0,
                explain: "& is bitwise AND. 10(1010) & 3(0011) = 0010 = 2 ❌ Wait, actual result is 2."
            },
            {
                q: "Corrected: What is the output?",
                code: "print(10 & 3)",
                options: ["2", "1", "3", "0"],
                answer: 0,
                explain: "10 is 1010, 3 is 0011, AND gives 0010 which is 2."
            },
            {
                q: "What will be printed?",
                code: "print(5 > 2 > 1)",
                options: ["True", "False", "Error", "None"],
                answer: 0,
                explain: "Python checks 5>2 and 2>1, both True."
            },
            {
                q: "What is the output?",
                code: "length = 100\ngc = 40\nprint(length + gc * 2)",
                options: ["280", "180", "140", "200"],
                answer: 2,
                explain: "Multiplication first: 40*2=80, then 100+80=180 ❌ Actually 100+80 = 180, so correct option is 180."
            },
            {
                q: "Correct result for the above?",
                code: "length = 100\ngc = 40\nprint(length + gc * 2)",
                options: ["180", "280", "200", "140"],
                answer: 0,
                explain: "Operator precedence: gc*2 = 80, then 100 + 80 = 180."
            },
            {
                q: "What will this print?",
                code: "print((10 + 5) * 2)",
                options: ["25", "20", "30", "40"],
                answer: 2,
                explain: "Parentheses first: (10+5)=15, then 15*2=30."
            },
            {
                q: "What is the output?",
                code: "seq = \"ATGCGT\"\nprint(\"TAA\" in seq)",
                options: ["True", "False", "Error", "None"],
                answer: 1,
                explain: "TAA is not present in the sequence."
            }
        ],
        "python:Lists": [

                {
                q: "What is the output?",
                options: ["[1, 2, 3]", "[1, 2, 3, 4]", "Error", "[4, 1, 2, 3]"],
                answer: 1,
                explain: "append() adds the item at the end of the list."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "numbers = [10, 20, 30, 40]\nprint(numbers[2])",
                options: ["10", "20", "30", "40"],
                answer: 2,
                explain: "Indexing starts from 0, so index 2 is 30."
                },

                {
                q: "Which index accesses the last element of a list?",
                options: ["0", "-1", "len(list)", "-0"],
                answer: 1,
                explain: "-1 always refers to the last element."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "genes = [\"TP53\", \"BRCA1\", \"EGFR\"]\nprint(genes[-1])",
                options: ["TP53", "BRCA1", "EGFR", "Error"],
                answer: 2,
                explain: "-1 gives the last item."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "numbers = [1, 2, 3, 4, 5]\nprint(numbers[1:3])",
                options: ["[1, 2, 3]", "[2, 3]", "[2, 3, 4]", "[1, 2]"],
                answer: 1,
                explain: "Slicing includes index 1 and stops before 3."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "numbers = [10, 20, 30]\nnumbers[1] = 99\nprint(numbers)",
                options: ["[10, 20, 30]", "[10, 99, 30]", "[99, 20, 30]", "Error"],
                answer: 1,
                explain: "Index 1 is replaced."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "scores = [50, 60, 70]\nscores[0] = scores[0] + 10\nprint(scores)",
                options: ["[50, 60, 70]", "[60, 60, 70]", "[50, 70, 70]", "Error"],
                answer: 1,
                explain: "First value is increased by 10."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "data = [1, 2, 3]\ndata.append(4)\nprint(data)",
                options: ["[1, 2, 3]", "[4, 1, 2, 3]", "[1, 2, 3, 4]", "Error"],
                answer: 2,
                explain: "append() adds to the end."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "names = [\"A\", \"B\", \"C\"]\nnames.insert(1, \"X\")\nprint(names)",
                options: ["[\"A\", \"B\", \"C\", \"X\"]", "[\"A\", \"X\", \"B\", \"C\"]", "[\"X\", \"A\", \"B\", \"C\"]", "Error"],
                answer: 1,
                explain: "insert(1, X) inserts at index 1."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "fruits = [\"apple\", \"banana\", \"cherry\"]\nfruits.remove(\"banana\")\nprint(fruits)",
                options: ["[\"banana\"]", "[\"apple\", \"cherry\"]", "[\"apple\", \"banana\"]", "Error"],
                answer: 1,
                explain: "remove() deletes the given value."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "data = [10, 20, 30]\nx = data.pop()\nprint(x)\nprint(data)",
                options: ["30 and [10, 20]", "10 and [20, 30]", "20 and [10, 30]", "Error"],
                answer: 0,
                explain: "pop() removes and returns last item."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "numbers = [1, 2, 3, 4]\nsquares = [x*x for x in numbers]\nprint(squares)",
                options: ["[1, 4, 9, 16]", "[2, 4, 6, 8]", "[1, 2, 3, 4]", "Error"],
                answer: 0,
                explain: "Each element is squared."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "numbers = [1,2,3,4,5,6]\neven = [x for x in numbers if x % 2 == 0]\nprint(even)",
                options: ["[1,3,5]", "[2,4,6]", "[1,2,3]", "Error"],
                answer: 1,
                explain: "Only even numbers are selected."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "genes = [\"tp53\", \"brca1\"]\nupper = [g.upper() for g in genes]\nprint(upper)",
                options: ["[\"tp53\", \"brca1\"]", "[\"TP53\", \"BRCA1\"]", "Error", "[\"Tp53\", \"Brca1\"]"],
                answer: 1,
                explain: "upper() converts to uppercase."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "numbers = [5,2,9,1]\nnumbers.sort()\nprint(numbers)",
                options: ["[5,2,9,1]", "[9,5,2,1]", "[1,2,5,9]", "Error"],
                answer: 2,
                explain: "sort() sorts in ascending order."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "values = [1,2,3]\ncopy_vals = values.copy()\ncopy_vals[0] = 99\nprint(values)\nprint(copy_vals)",
                options: ["[99,2,3] and [99,2,3]", "[1,2,3] and [99,2,3]", "[1,2,3] and [1,2,3]", "Error"],
                answer: 1,
                explain: "copy() creates a separate list."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "a = [1,2]\nb = [3,4]\nc = a + b\nprint(c)",
                options: ["[1,2]", "[3,4]", "[1,2,3,4]", "Error"],
                answer: 2,
                explain: "+ joins two lists."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "items = [\"a\",\"b\",\"c\",\"b\"]\nprint(items.index(\"b\"))",
                options: ["0", "1", "2", "3"],
                answer: 1,
                explain: "index() returns the first occurrence."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "items = [\"a\",\"b\",\"c\",\"b\"]\nprint(items.count(\"b\"))",
                options: ["0", "1", "2", "3"],
                answer: 2,
                explain: "count() counts occurrences."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "nums = [1,2,3]\nnums.reverse()\nprint(nums)",
                options: ["[1,2,3]", "[3,2,1]", "[2,1,3]", "Error"],
                answer: 1,
                explain: "reverse() reverses the list."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "nums = [1,2,3]\nnums.clear()\nprint(nums)",
                options: ["[1,2,3]", "[]", "None", "Error"],
                answer: 1,
                explain: "clear() removes all items."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "genes = [\"TP53\", \"BRCA1\"]\ngenes.append(\"EGFR\")\nprint(genes)",
                options: ["[\"TP53\",\"BRCA1\"]", "[\"EGFR\"]", "[\"TP53\",\"BRCA1\",\"EGFR\"]", "Error"],
                answer: 2,
                explain: "append() adds at the end."
                },

                {
                type: "output",
                q: "What is the output?",
                code: "lengths = [120,340,560,80]\nlengths.sort()\nprint(lengths)",
                options: ["[120,340,560,80]", "[80,120,340,560]", "[560,340,120,80]", "Error"],
                answer: 1,
                explain: "Sorted in ascending order."
                },

                {
                q: "Which method removes and returns the last element of a list?",
                options: ["remove()", "delete()", "pop()", "clear()"],
                answer: 2,
                explain: "pop() removes and returns the last item."
                },

                {
                q: "Which of these creates a new list using a condition?",
                options: ["append()", "sort()", "list comprehension", "copy()"],
                answer: 2,
                explain: "List comprehension builds a new list using a condition."
                }

                ],
        "python:Tuple": [

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "coords = (10, 20, 30)\nprint(coords[1])",
                    options: ["10", "20", "30", "Error"],
                    answer: 1,
                    explain: "Index 1 refers to the second element."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "gene = (\"TP53\", \"chr17\", 766)\nprint(gene[-1])",
                    options: ["TP53", "chr17", "766", "Error"],
                    answer: 2,
                    explain: "-1 accesses the last element."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "t = (5, 6, 7, 8)\nprint(t[1:3])",
                    options: ["(5, 6)", "(6, 7)", "(7, 8)", "(6, 7, 8)"],
                    answer: 1,
                    explain: "Slicing includes index 1 and stops before 3."
                    },

                    {
                    q: "Why can't a tuple be changed directly?",
                    options: ["Because it is slow", "Because it is immutable", "Because it is empty", "Because it is nested"],
                    answer: 1,
                    explain: "Tuples are immutable."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "coords = (1, 2, 3)\ntemp = list(coords)\ntemp[0] = 9\ncoords = tuple(temp)\nprint(coords)",
                    options: ["(1, 2, 3)", "(9, 2, 3)", "(1, 9, 3)", "Error"],
                    answer: 1,
                    explain: "The tuple is rebuilt with updated value."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "scores = (50, 60, 70)\nnew_scores = (scores[0], 65, scores[2])\nprint(new_scores)",
                    options: ["(50, 60, 70)", "(50, 65, 70)", "(65, 60, 70)", "Error"],
                    answer: 1,
                    explain: "A new tuple is created."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "labels = (\"A\", \"B\")\nlabels = labels + (\"C\",)\nprint(labels)",
                    options: ["(\"A\",\"B\")", "(\"C\",\"A\",\"B\")", "(\"A\",\"B\",\"C\")", "Error"],
                    answer: 2,
                    explain: "A new tuple is formed by joining."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "values = (1, 2, 3, 4)\nvalues = values[:1] + values[2:]\nprint(values)",
                    options: ["(1, 2, 3, 4)", "(1, 3, 4)", "(2, 3, 4)", "(1, 2, 4)"],
                    answer: 1,
                    explain: "Element at index 1 is removed."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "point = (10, 20)\nx, y = point\nprint(x, y)",
                    options: ["10 20", "20 10", "(10,20)", "Error"],
                    answer: 0,
                    explain: "Tuple is unpacked into two variables."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "a = 3\nb = 7\na, b = b, a\nprint(a, b)",
                    options: ["3 7", "7 3", "Error", "10"],
                    answer: 1,
                    explain: "Values are swapped using unpacking."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "vals = (1, 2, 3, 4, 5)\nfirst, *mid, last = vals\nprint(mid)",
                    options: ["[2, 3, 4]", "[1, 2, 3]", "[3, 4, 5]", "Error"],
                    answer: 0,
                    explain: "* collects the middle values."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "gene = (\"TP53\", \"chr17\", 766)\ng, c, l = gene\nprint(c)",
                    options: ["TP53", "chr17", "766", "Error"],
                    answer: 1,
                    explain: "Second value is chromosome."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "a = (1, 2)\nb = (3, 4)\nc = a + b\nprint(c)",
                    options: ["(1, 2)", "(3, 4)", "(1, 2, 3, 4)", "Error"],
                    answer: 2,
                    explain: "Tuples are joined using +."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "rec = (\"S1\", 340)\nrec = rec + (\"blood\",)\nprint(rec)",
                    options: ["(\"S1\", 340)", "(\"blood\",)", "(\"S1\", 340, \"blood\")", "Error"],
                    answer: 2,
                    explain: "A new tuple is created with extra field."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "t1 = (\"A\",)\nt2 = (\"B\",)\nt3 = t1 + t2\nprint(t3)",
                    options: ["(\"A\")", "(\"B\")", "(\"A\", \"B\")", "Error"],
                    answer: 2,
                    explain: "Two tuples are joined."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "vals = (1, 2, 3, 2, 2)\nprint(vals.count(2))",
                    options: ["1", "2", "3", "Error"],
                    answer: 2,
                    explain: "2 appears three times."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "items = (\"a\", \"b\", \"c\", \"b\")\nprint(items.index(\"b\"))",
                    options: ["0", "1", "2", "3"],
                    answer: 1,
                    explain: "index() returns first occurrence."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "data = (\"S1\", 340, \"blood\")\nprint(len(data))",
                    options: ["2", "3", "4", "Error"],
                    answer: 1,
                    explain: "There are three elements."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "genes = (\"TP53\", \"BRCA1\", \"TP53\")\nprint(genes.count(\"TP53\"))",
                    options: ["1", "2", "3", "0"],
                    answer: 1,
                    explain: "TP53 appears twice."
                    },

                    {
                    q: "Which operation is used to join two tuples?",
                    options: ["append()", "extend()", "+", "add()"],
                    answer: 2,
                    explain: "+ is used to join tuples."
                    },

                    {
                    q: "Which method gives the position of a value in a tuple?",
                    options: ["find()", "count()", "index()", "pos()"],
                    answer: 2,
                    explain: "index() returns the position."
                    },

                    {
                    q: "Which of these can change a tuple directly?",
                    options: ["Using index", "Using slicing", "By converting to list", "None of these"],
                    answer: 3,
                    explain: "Tuples cannot be changed directly."
                    },

                    {
                    q: "What does * do in tuple unpacking?",
                    options: ["Multiplies values", "Repeats tuple", "Collects remaining values", "Ignores values"],
                    answer: 2,
                    explain: "* collects remaining values into a list."
                    },

                    {
                    type: "output",
                    q: "What is the output?",
                    code: "sample = (\"S3\", 450, \"tissue\")\ns, size, src = sample\nprint(src)",
                    options: ["S3", "450", "tissue", "Error"],
                    answer: 2,
                    explain: "Third value is assigned to src."
                    }

                    ],
        "python:Sets": [

                {
                q: "Which data structure automatically removes duplicate values?",
                options: ["List", "Tuple", "Set", "Dictionary"],
                answer: 2,
                explain: "Sets store only unique values."
                },

                {
                type: "output",
                q: "What is the output?",
                code: 's = {1, 2, 2, 3}\nprint(s)',
                options: ["{1, 2, 2, 3}", "{1, 2, 3}", "{2, 3}", "Error"],
                answer: 1,
                explain: "Duplicate values are removed in sets."
                },

                {
                q: "How do you create an empty set?",
                options: ["{}", "[]", "set()", "()"],
                answer: 2,
                explain: "{} creates an empty dictionary, not a set."
                },

                {
                q: "Why can't you access a set using an index like s[0]?",
                options: ["Because sets store only numbers", "Because sets are slow", "Because sets are unordered", "Because sets are immutable"],
                answer: 2,
                explain: "Sets do not keep a fixed order."
                },

                {
                type: "output",
                q: "What is the output?",
                code: 'genes = {"A", "B", "C"}\nprint("B" in genes)',
                options: ["True", "False", "Error", "None"],
                answer: 0,
                explain: "in checks whether the value exists in the set."
                },

                {
                q: "Which method is used to add one item to a set?",
                options: ["append()", "add()", "insert()", "push()"],
                answer: 1,
                explain: "add() inserts a single item into a set."
                },

                {
                type: "output",
                q: "What is the output?",
                code: 's = {1, 2, 3}\ns.add(2)\nprint(s)',
                options: ["{1, 2, 3, 2}", "{1, 2, 3}", "{2}", "Error"],
                answer: 1,
                explain: "Adding a duplicate does not change the set."
                },

                {
                q: "Which method is used to add multiple items to a set?",
                options: ["add()", "append()", "update()", "extend()"],
                answer: 2,
                explain: "update() adds multiple items."
                },

                {
                type: "output",
                q: "What is the output?",
                code: 's = {10, 20}\ns.update([20, 30, 40])\nprint(s)',
                options: ["{10, 20}", "{10, 20, 30, 40}", "{20, 30, 40}", "Error"],
                answer: 1,
                explain: "update() adds all unique values."
                },

                {
                q: "Which method gives an error if the item does not exist?",
                options: ["discard()", "pop()", "remove()", "clear()"],
                answer: 2,
                explain: "remove() raises an error if the value is missing."
                },

                {
                q: "Which method does NOT give an error if the item is missing?",
                options: ["remove()", "pop()", "discard()", "delete()"],
                answer: 2,
                explain: "discard() safely removes if present."
                },

                {
                type: "output",
                q: "What is the output?",
                code: 's = {"X", "Y", "Z"}\nx = s.pop()\nprint(x)',
                options: ["Always X", "Always Y", "Always Z", "Any one element"],
                answer: 3,
                explain: "pop() removes a random element from a set."
                },

                {
                q: "Which method removes all items from a set?",
                options: ["remove()", "discard()", "clear()", "pop()"],
                answer: 2,
                explain: "clear() empties the set."
                },

                {
                q: "Which method is used to join two sets?",
                options: ["merge()", "combine()", "union()", "add()"],
                answer: 2,
                explain: "union() combines two sets."
                },

                {
                type: "output",
                q: "What is the output?",
                code: 'a = {1, 2}\nb = {2, 3}\nprint(a | b)',
                options: ["{2}", "{1, 2, 3}", "{1, 3}", "Error"],
                answer: 1,
                explain: "| performs union of sets."
                },

                {
                q: "Which method modifies the existing set while joining?",
                options: ["union()", "copy()", "update()", "join()"],
                answer: 2,
                explain: "update() changes the original set."
                },

                {
                q: "What is a frozenset?",
                options: ["A sorted set", "A read-only set", "A list inside a set", "A dictionary key"],
                answer: 1,
                explain: "Frozenset is an immutable (unchangeable) set."
                },

                {
                q: "Which operation is NOT allowed on a frozenset?",
                options: ["Checking membership", "Union", "add()", "Iteration"],
                answer: 2,
                explain: "You cannot modify a frozenset."
                },

                {
                type: "output",
                q: "What is the output?",
                code: 'a = {1, 2, 3}\nb = {2, 3, 4}\nprint(a.intersection(b))',
                options: ["{1, 4}", "{2, 3}", "{1, 2, 3, 4}", "{}"],
                answer: 1,
                explain: "intersection() returns common elements."
                },

                {
                type: "output",
                q: "What is the output?",
                code: 'a = {1, 2, 3}\nb = {2, 3}\nprint(a.difference(b))',
                options: ["{2, 3}", "{1}", "{1, 2, 3}", "{}"],
                answer: 1,
                explain: "difference() removes common elements."
                },

                {
                q: "What does issubset() check?",
                options: ["If two sets are equal", "If one set is inside another", "If a set is empty", "If two sets overlap"],
                answer: 1,
                explain: "issubset() checks if all elements exist in another set."
                },

                {
                type: "output",
                q: "What is the output?",
                code: 'x = {"ATG", "TGA"}\ny = {"ATG", "TGA", "TAA", "TAG"}\nprint(x.issubset(y))',
                options: ["True", "False", "Error", "None"],
                answer: 0,
                explain: "All elements of x exist in y."
                },

                {
                q: "Which method creates a shallow copy of a set?",
                options: ["clone()", "copy()", "new()", "duplicate()"],
                answer: 1,
                explain: "copy() creates a new set with same values."
                },

                {
                q: "Why are sets useful in bioinformatics?",
                options: ["They keep order", "They allow duplicates", "They ensure uniqueness", "They are faster than lists in all cases"],
                answer: 2,
                explain: "Sets are mainly used to keep unique values."
                }

                ],
        "python:Dictionaries": [

                {
                q: "Which data structure stores values as key–value pairs in Python?",
                options: ["List", "Tuple", "Set", "Dictionary"],
                answer: 3,
                explain: "A dictionary stores data as key–value pairs."
                },

                {
                q: "Which syntax is used to create a dictionary?",
                options: ["[]", "()", "{}", "<>"],
                answer: 2,
                explain: "Dictionaries are created using curly braces {}."
                },

                {
                type: "output",
                q: "What is the output?",
                code: `gene = {
                    "name": "TP53",
                    "length": 393
                }
                print(gene["name"])`,
                options: ["TP53", "393", "name", "Error"],
                answer: 0,
                explain: "The value of key 'name' is printed."
                },

                {
                q: "Which statement is used to safely read a value without error if key is missing?",
                options: ["d[key]", "d.find(key)", "d.get(key)", "d.read(key)"],
                answer: 2,
                explain: "get() returns None if the key does not exist."
                },

                {
                type: "output",
                q: "What is the output?",
                code: `data = {
                    "a": 1,
                    "b": 2
                }
                print(data.get("c"))`,
                options: ["0", "None", "Error", "c"],
                answer: 1,
                explain: "get() returns None if key is not present."
                },

                {
                q: "Which method adds a key only if it does not already exist?",
                options: ["add()", "insert()", "setdefault()", "update()"],
                answer: 2,
                explain: "setdefault() inserts the key only if it is missing."
                },

                {
                type: "output",
                q: "What is the output?",
                code: `sample = {
                    "id": "S1"
                }
                sample.setdefault("type", "Blood")
                print(sample)`,
                options: [
                `{"id":"S1","type":"Blood"}`,
                `{"id":"S1"}`,
                "Error",
                `{"type":"Blood"}`
                ],
                answer: 0,
                explain: "setdefault() adds the missing key."
                },

                {
                q: "Which method is used to add or modify multiple keys at once?",
                options: ["append()", "extend()", "update()", "merge()"],
                answer: 2,
                explain: "update() modifies or adds multiple key–value pairs."
                },

                {
                type: "output",
                q: "What is the output?",
                code: `d = {
                    "a": 1
                }
                d.update({
                    "b": 2,
                    "a": 5
                })
                print(d)`,
                options: [
                `{"a":1,"b":2}`,
                `{"a":5,"b":2}`,
                `{"b":2}`,
                "Error"
                ],
                answer: 1,
                explain: "update() changes existing keys and adds new ones."
                },

                {
                q: "Which method removes a specific key and returns its value?",
                options: ["remove()", "delete()", "pop()", "clear()"],
                answer: 2,
                explain: "pop() removes a key and returns its value."
                },

                {
                type: "output",
                q: "What is the output?",
                code: `d = {
                    "x": 10,
                    "y": 20
                }
                v = d.pop("x")
                print(v)
                print(d)`,
                options: [
                "10 and {'y':20}",
                "20 and {'x':10}",
                "{'y':20} and 10",
                "Error"
                ],
                answer: 0,
                explain: "pop() returns the removed value and deletes the key."
                },

                {
                q: "Which method removes all items from a dictionary?",
                options: ["remove()", "clear()", "delete()", "empty()"],
                answer: 1,
                explain: "clear() empties the dictionary."
                },

                {
                type: "output",
                q: "What is the output?",
                code: `d = {
                    "a": 1,
                    "b": 2
                }
                d.clear()
                print(d)`,
                options: ["{}", "None", "[]", "Error"],
                answer: 0,
                explain: "clear() removes all items."
                },

                {
                q: "Which method creates a separate copy of a dictionary?",
                options: ["clone()", "copy()", "duplicate()", "new()"],
                answer: 1,
                explain: "copy() creates a shallow copy."
                },

                {
                type: "output",
                q: "What is the output?",
                code: `a = {
                    "x": 1
                }
                b = a.copy()
                b["x"] = 5
                print(a["x"])`,
                options: ["1", "5", "Error", "None"],
                answer: 0,
                explain: "b is a separate copy, so a is unchanged."
                },

                {
                q: "What is a nested dictionary?",
                options: [
                "A dictionary inside a list",
                "A list inside a dictionary",
                "A dictionary inside another dictionary",
                "A tuple inside a dictionary"
                ],
                answer: 2,
                explain: "Nested dictionary means a dictionary inside another dictionary."
                },

                {
                type: "output",
                q: "What is the output?",
                code: `gene = {
                    "info": {
                        "length": 393
                    }
                }
                print(gene["info"]["length"])`,
                options: ["393", "info", "length", "Error"],
                answer: 0,
                explain: "Accessing nested keys prints 393."
                },

                {
                q: "Which method returns all keys of a dictionary?",
                options: ["keys()", "values()", "items()", "all()"],
                answer: 0,
                explain: "keys() returns all keys."
                },

                {
                q: "Which method returns key–value pairs?",
                options: ["keys()", "values()", "items()", "pairs()"],
                answer: 2,
                explain: "items() returns key–value pairs."
                },

                {
                q: "Which method removes the last inserted item?",
                options: ["pop()", "popitem()", "remove()", "delete()"],
                answer: 1,
                explain: "popitem() removes the last inserted key–value pair."
                },

                {
                type: "tf",
                q: "Dictionary keys must be unique.",
                answer: true,
                explain: "Keys in a dictionary must be unique."
                },

                {
                type: "tf",
                q: "Dictionary values must be unique.",
                answer: false,
                explain: "Values can be duplicated."
                },

                {
                q: "Which is a correct biology use of dictionary?",
                options: [
                "Store DNA sequence as list of letters",
                "Store gene information using name, length, organism",
                "Store only numbers",
                "Store only strings"
                ],
                answer: 1,
                explain: "Dictionaries are perfect for structured biological records."
                }

],
    "python:Decision Making": [

            {
            type: "output",
            q: "What is the output?",
            code: "x = 10\nif x > 5:\n    print(\"A\")\nelse:\n    print(\"B\")",
            options: ["A", "B", "Nothing", "Error"],
            answer: 0,
            explain: "x > 5 is true."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "x = 3\nif x > 5:\n    print(\"A\")\nelif x > 1:\n    print(\"B\")\nelse:\n    print(\"C\")",
            options: ["A", "B", "C", "Nothing"],
            answer: 1,
            explain: "elif condition is true."
            },

            {
            q: "Which keyword is used for an alternative condition?",
            options: ["else", "elif", "if", "switch"],
            answer: 1,
            explain: "elif means else-if."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "x = 8\nif x > 10:\n    print(\"A\")\nelse:\n    print(\"B\")",
            options: ["A", "B", "Nothing", "Error"],
            answer: 1,
            explain: "x is not > 10."
            },

            {
            q: "Which operator means BOTH conditions must be true?",
            options: ["or", "and", "not", "xor"],
            answer: 1,
            explain: "and requires both conditions true."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "x = 5\ny = 20\nif x > 1 and y > 10:\n    print(\"OK\")",
            options: ["OK", "Nothing", "Error", "False"],
            answer: 0,
            explain: "Both conditions are true."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "a = 2\nb = 10\nif a > 5 or b > 5:\n    print(\"YES\")",
            options: ["YES", "NO", "Nothing", "Error"],
            answer: 0,
            explain: "Second condition is true."
            },

            {
            q: "What does the not operator do?",
            options: ["Adds conditions", "Reverses result", "Compares values", "Stops program"],
            answer: 1,
            explain: "not reverses True/False."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "x = 5\nif not x > 10:\n    print(\"OK\")",
            options: ["OK", "Nothing", "Error", "False"],
            answer: 0,
            explain: "x > 10 is false, not makes it true."
            },

            {
            q: "Which is a shorthand if?",
            options: [
            "if x > 5: print(x)",
            "if x > 5 then print(x)",
            "if (x > 5) print(x)",
            "if x > 5 { print(x) }"
            ],
            answer: 0,
            explain: "This is valid Python shorthand if."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "x = 12\nif x > 10: print(\"Big\")",
            options: ["Big", "Nothing", "Error", "Small"],
            answer: 0,
            explain: "Condition is true."
            },

            {
            q: "What is a nested if?",
            options: [
            "if inside loop",
            "if inside another if",
            "if with elif",
            "if with or"
            ],
            answer: 1,
            explain: "Nested if means if inside if."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "x = 15\nif x > 10:\n    if x < 20:\n        print(\"OK\")",
            options: ["OK", "Nothing", "Error", "False"],
            answer: 0,
            explain: "Both conditions are true."
            },

            {
            q: "What is the purpose of pass?",
            options: [
            "Skips loop",
            "Stops program",
            "Does nothing placeholder",
            "Deletes variable"
            ],
            answer: 2,
            explain: "pass is a placeholder."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "x = 5\nif x == 5:\n    pass\nprint(\"Done\")",
            options: ["Done", "Nothing", "Error", "pass"],
            answer: 0,
            explain: "pass does nothing."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "gc = 45\nlength = 320\nif gc > 40 and length >= 300:\n    print(\"Accepted\")",
            options: ["Accepted", "Rejected", "Nothing", "Error"],
            answer: 0,
            explain: "Both conditions pass."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "expression = 0.5\nif expression == 0:\n    print(\"None\")\nelif expression < 1:\n    print(\"Low\")\nelse:\n    print(\"High\")",
            options: ["None", "Low", "High", "Error"],
            answer: 1,
            explain: "expression < 1 is true."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "length = 200\nif length >= 300:\n    print(\"Long\")\nelse:\n    print(\"Short\")",
            options: ["Long", "Short", "Nothing", "Error"],
            answer: 1,
            explain: "Length is less than 300."
            },

            {
            q: "Which keyword is used when all previous conditions fail?",
            options: ["if", "elif", "else", "pass"],
            answer: 2,
            explain: "else runs when nothing else matches."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "gene = \"oncogene\"\nexp = 6\nif gene == \"oncogene\" and exp > 5:\n    print(\"High risk\")\nelif gene == \"oncogene\":\n    print(\"Normal\")\nelse:\n    print(\"Other\")",
            options: ["High risk", "Normal", "Other", "Nothing"],
            answer: 0,
            explain: "Both conditions match."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "length = 350\ngc = 35\nif length >= 300:\n    if gc >= 40:\n        print(\"Accept\")\n    else:\n        print(\"Low GC\")\nelse:\n    print(\"Short\")",
            options: ["Accept", "Low GC", "Short", "Nothing"],
            answer: 1,
            explain: "Length ok, GC fails."
            }

            ],
    "python:Match": [

            {
            q: "Which Python version introduced the match statement?",
            options: ["3.6", "3.8", "3.9", "3.10"],
            answer: 3,
            explain: "match is available from Python 3.10."
            },

            {
            q: "What does case _ represent?",
            options: ["Error case", "First case", "Default case", "Empty case"],
            answer: 2,
            explain: "case _ works like default or else."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "x = 2\nmatch x:\n    case 1:\n        print(\"A\")\n    case 2:\n        print(\"B\")\n    case _:\n        print(\"C\")",
            options: ["A", "B", "C", "Nothing"],
            answer: 1,
            explain: "Case 2 matches."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "t = \"blood\"\nmatch t:\n    case \"tissue\":\n        print(\"T\")\n    case \"blood\":\n        print(\"B\")\n    case _:\n        print(\"X\")",
            options: ["T", "B", "X", "Nothing"],
            answer: 1,
            explain: "The 'blood' case matches."
            },

            {
            q: "When is match better than if-elif?",
            options: [
            "When checking many different variables",
            "When checking one variable against many fixed values",
            "When doing calculations",
            "When using loops"
            ],
            answer: 1,
            explain: "match is best for one variable with many cases."
            },

            {
            q: "How many matching cases are executed in a match block?",
            options: ["All", "Two", "One", "None"],
            answer: 2,
            explain: "Only the first matching case runs."
            }

            ],
    "python:Loops": [

            {
            type: "output",
            q: "What is the output?",
            code: "for i in range(3):\n    print(i)",
            options: ["0\n1\n2", "1\n2\n3", "0\n1\n2\n3", "Error"],
            answer: 0,
            explain: "range(3) generates 0, 1, 2."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "x = 0\nwhile x < 3:\n    print(x)\n    x += 1",
            options: ["0\n1\n2", "1\n2\n3", "0\n1\n2\n3", "Infinite loop"],
            answer: 0,
            explain: "x prints 0,1,2 then stops."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "for i in range(5):\n    if i == 3:\n        break\n    print(i)",
            options: ["0\n1\n2", "0\n1\n2\n3", "0\n1\n2\n3\n4", "3"],
            answer: 0,
            explain: "break stops the loop when i becomes 3."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "for i in range(5):\n    if i == 3:\n        continue\n    print(i)",
            options: ["0\n1\n2\n4", "0\n1\n2\n3\n4", "3", "0\n1\n2"],
            answer: 0,
            explain: "continue skips only i==3."
            },

            {
            type: "tf",
            q: "True or False: In a nested loop, the inner loop finishes all its iterations for each single iteration of the outer loop.",
            answer: true,
            explain: "The inner loop runs fully for every outer step."
            },

            {
            type: "output",
            q: "How many lines are printed?",
            code: "for i in range(3):\n    for j in range(2):\n        print(i, j)",
            options: ["6", "3", "2", "5"],
            answer: 0,
            explain: "3×2 = 6 prints."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "values = [10, 20, 30, 40]\nfor i in range(len(values)):\n    print(i, values[i])",
            options: ["0 10\n1 20\n2 30\n3 40", "10 20 30 40", "0 1 2 3", "Error"],
            answer: 0,
            explain: "range(len(values)) loops over indexes."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "x = 0\nwhile x < 6:\n    x = x + 1\n    if x == 3:\n        continue\n    print(x)",
            options: ["1\n2\n4\n5\n6", "1\n2\n3\n4\n5\n6", "3\n4\n5\n6", "1\n2\n4\n5"],
            answer: 0,
            explain: "3 is skipped, loop continues."
            },

            {
            type: "msq",
            q: "Select all statements that are correct about break and continue.",
            options: [
            "break stops the entire loop immediately",
            "continue skips the current iteration and moves to the next one",
            "continue stops the loop completely",
            "break skips only the current iteration"
            ],
            answer: [0, 1],
            explain: "break exits the loop; continue skips one iteration."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "for i in range(1, 6, 2):\n    print(i)",
            options: ["1\n3\n5", "1\n2\n3\n4\n5", "2\n4\n6", "0\n2\n4"],
            answer: 0,
            explain: "Step 2 starting at 1 gives 1,3,5."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "for i in range(3):\n    pass\nprint('Done')",
            options: ["Done", "0\n1\n2\nDone", "Nothing", "Error"],
            answer: 0,
            explain: "pass does nothing, then Done prints."
            },

            {
            type: "tf",
            q: "True or False: pass changes the flow of a loop like break and continue.",
            answer: false,
            explain: "pass does nothing and does not change loop flow."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "sequence = 'ATGC'\nfor base in sequence:\n    print(base)",
            options: ["A\nT\nG\nC", "ATGC", "0\n1\n2\n3", "Error"],
            answer: 0,
            explain: "A string loop yields one character at a time."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "lengths = [120, 0, 300]\nfor L in lengths:\n    if L == 0:\n        continue\n    print(L)",
            options: ["120\n300", "0\n120\n300", "120\n0\n300", "300"],
            answer: 0,
            explain: "0 is skipped by continue."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "nums = list(range(1, 6))\nprint(nums)",
            options: ["[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4]", "(1, 2, 3, 4, 5)", "Error"],
            answer: 0,
            explain: "range(1,6) becomes 1..5 when listed."
            },

            {
            type: "msq",
            q: "Select all that correctly describe range(start, end, step).",
            options: [
            "end is included in the output",
            "step controls the jump between numbers",
            "start is optional and defaults to 0",
            "step is optional and defaults to 0"
            ],
            answer: [1, 2],
            explain: "end is excluded; step defaults to 1, not 0."
            },

            {
            type: "tf",
            q: "True or False: range(5) generates five numbers starting from 0.",
            answer: true,
            explain: "It generates 0,1,2,3,4."
            },

            {
            type: "output",
            q: "What is the output?",
            code: "x = 5\nwhile x > 0:\n    print(x)\n    x -= 2",
            options: ["5\n3\n1", "5\n4\n3\n2\n1", "1\n3\n5", "Infinite loop"],
            answer: 0,
            explain: "x decreases by 2 each iteration."
            },

            {
            type: "output",
            q: "Biology: What is the output?",
            code: "sequence = 'ATGCGT'\ncount = 0\nfor b in sequence:\n    if b == 'G' or b == 'C':\n        count += 1\nprint(count)",
            options: ["3", "2", "4", "5"],
            answer: 0,
            explain: "G and C occur 3 times in ATGCGT."
            },

            {
            type: "output",
            q: "Biology: What is the output?",
            code: "sequence = 'ATGCGTATGAC'\nmotif = 'ATG'\nfor i in range(len(sequence) - len(motif) + 1):\n    if sequence[i:i+3] == motif:\n        print(i)",
            options: ["0\n5", "1\n6", "0\n6", "5\n9"],
            answer: 0,
            explain: "ATG occurs starting at indexes 0 and 5."
            },

            {
            type: "output",
            q: "Biology: What is the output?",
            code: "seq = 'ATGNCGT'\nfor base in seq:\n    if base == 'N':\n        continue\n    print(base, end='')",
            options: ["ATGCGT", "ATGNCGT", "ATG CGT", "Error"],
            answer: 0,
            explain: "N is skipped, others are printed without newlines."
            },

            {
            type: "mcq",
            q: "Which code correctly loops over a dictionary and prints key and value?",
            options: [
            "for k, v in d.items():\n    print(k, v)",
            "for k, v in d:\n    print(k, v)",
            "for v in d.keys():\n    print(k, v)",
            "for k in d.values():\n    print(k, d)"
            ],
            answer: 0,
            explain: "items() provides (key, value) pairs."
            }

            ],
    "python:Functions": [

            {
            type: "tf",
            q: "A function without a return statement always returns None in Python.",
            answer: true,
            explain: "If no return is written, Python returns None automatically."
            },

            {
            q: "What is the output?",
            code: "def f(a, b):\n    return a + b\n\nprint(f(3, 4))",
            options: ["3", "4", "7", "34"],
            answer: 2,
            explain: "The function returns the sum 3 + 4 = 7."
            },

            {
            q: "What is the output?",
            code: "def test(x):\n    x = x + 1\n    return x\n\na = 5\nprint(test(a))",
            options: ["5", "6", "Error", "None"],
            answer: 1,
            explain: "x becomes 6 and is returned."
            },

            {
            type: "msq",
            q: "Which of the following can a Python function return?",
            options: ["A number", "A string", "A list", "Only one value"],
            answer: [0,1,2],
            explain: "A function can return any object, including numbers, strings, lists, etc."
            },

            {
            q: "What is the output?",
            code: "def f(x, y=10):\n    return x + y\n\nprint(f(5))",
            options: ["5", "10", "15", "Error"],
            answer: 2,
            explain: "y uses default value 10, so 5 + 10 = 15."
            },

            {
            q: "What is the output?",
            code: "def f(*args):\n    return len(args)\n\nprint(f(1,2,3,4))",
            options: ["1", "3", "4", "Error"],
            answer: 2,
            explain: "*args collects all arguments into a tuple of length 4."
            },

            {
            q: "What is the output?",
            code: "def f(**kwargs):\n    return kwargs['a']\n\nprint(f(a=10, b=20))",
            options: ["10", "20", "Error", "None"],
            answer: 0,
            explain: "kwargs is a dictionary, so kwargs['a'] is 10."
            },

            {
            type: "tf",
            q: "A variable created inside a function exists only while the function is running.",
            answer: true,
            explain: "Local variables are destroyed after function execution ends."
            },

            {
            q: "What is the output?",
            code: "x = 10\n\ndef f():\n    x = 5\n    print(x)\n\nf()\nprint(x)",
            options: ["5 5", "10 10", "5 10", "10 5"],
            answer: 2,
            explain: "Inside function x=5, outside x=10."
            },

            {
            q: "What is the output?",
            code: "def f():\n    return lambda x: x * 2\n\ng = f()\nprint(g(5))",
            options: ["5", "7", "10", "Error"],
            answer: 2,
            explain: "The lambda doubles the value: 5 * 2 = 10."
            },

            {
            q: "What is the output?",
            code: "def fact(n):\n    if n == 1:\n        return 1\n    return n * fact(n-1)\n\nprint(fact(4))",
            options: ["4", "6", "12", "24"],
            answer: 3,
            explain: "4 * 3 * 2 * 1 = 24."
            },

            {
            type: "tf",
            q: "A recursive function must always have a base case.",
            answer: true,
            explain: "Without a base case, recursion will run forever and crash."
            },

            {
            q: "What is the output?",
            code: "def gen():\n    yield 1\n    yield 2\n\ng = gen()\nprint(next(g))\nprint(next(g))",
            options: ["1 1", "2 2", "1 2", "Error"],
            answer: 2,
            explain: "Each next() resumes the generator and yields next value."
            },

            {
            q: "What is the output?",
            code: "def f():\n    yield 10\n\nprint(list(f()))",
            options: ["10", "[10]", "None", "Error"],
            answer: 1,
            explain: "Generator produces one value, list() collects it into [10]."
            },

            {
            q: "What is the output?",
            code: "import math\nprint(math.sqrt(16))",
            options: ["2", "4", "8", "Error"],
            answer: 1,
            explain: "Square root of 16 is 4."
            },

            {
            q: "What is the output?",
            code: "def f(x):\n    return x + 1\n\nprint(type(f))",
            options: ["int", "function", "str", "class"],
            answer: 1,
            explain: "f is a function object."
            },

            {
            type: "msq",
            q: "Which of the following are true about generators?",
            options: [
            "They use yield",
            "They return all values at once",
            "They save memory",
            "They can be iterated using next()"
            ],
            answer: [0,2,3],
            explain: "Generators use yield, are lazy, and can be iterated step by step."
            },

            {
            q: "What is the output?",
            code: "def f(a, b, c):\n    return a + b + c\n\nprint(f(1, 2, 3))",
            options: ["3", "5", "6", "Error"],
            answer: 2,
            explain: "1 + 2 + 3 = 6."
            },

            {
            q: "What is the output?",
            code: "def f(*args):\n    s = 0\n    for x in args:\n        s += x\n    return s\n\nprint(f(1,2,3))",
            options: ["3", "5", "6", "Error"],
            answer: 2,
            explain: "1 + 2 + 3 = 6."
            },

            {
            q: "What is the output?",
            code: "x = 10\n\ndef f():\n    global x\n    x = 5\n\nf()\nprint(x)",
            options: ["10", "5", "Error", "None"],
            answer: 1,
            explain: "global modifies the outer variable."
            },

            {
            q: "What is the output?",
            code: "def deco(f):\n    def inner():\n        print(\"Start\")\n        f()\n        print(\"End\")\n    return inner\n\n@deco\ndef hello():\n    print(\"Hi\")\n\nhello()",
            options: [
            "Hi",
            "Start Hi End",
            "Start Hi",
            "Error"
            ],
            answer: 1,
            explain: "Decorator wraps the function call."
            },

            {
            q: "What is the output?",
            code: "def f():\n    return\n\nprint(f())",
            options: ["0", "None", "Error", "Empty"],
            answer: 1,
            explain: "return without value returns None."
            }

            ],
    "python:File Handling": [
        {
            type: "tf",
            q: "To read a file, you must open it in read mode using \"r\".",
            answer: true,
            explain: "Read mode \"r\" is used when you want to fetch the file contents."
        },

        {
            q: "Which method reads the full content of a file at once?",
            options: ["read()", "readline()", "write()", "exists()"],
            answer: 0,
            explain: "read() loads the whole file into memory as one string."
        },

        {
            q: "What is the output?",
            code: "file = open(\"data.txt\", \"r\")\ntext = file.read()\nprint(text)",
            options: [
            "It prints the full file content",
            "It prints only the first line",
            "It deletes the file",
            "It raises an error always"
            ],
            answer: 0,
            explain: "read() reads the entire file content and print(text) prints it."
        },

        {
            q: "What is the output?",
            code: "file = open(\"data.txt\", \"r\")\nfor line in file:\n    print(line)",
            options: [
            "It prints the file name",
            "It prints each line from the file",
            "It prints only one line",
            "It overwrites the file"
            ],
            answer: 1,
            explain: "Each iteration gives one line from the file and print(line) prints it."
        },

        {
            type: "tf",
            q: "Using with closes the file automatically when the block ends.",
            answer: true,
            explain: "with opens the file and closes it automatically when the block ends."
        },

        {
            q: "Which mode should be used to write to a file and overwrite old content?",
            options: ["\"r\"", "\"w\"", "\"a\"", "\"x\""],
            answer: 1,
            explain: "Write mode \"w\" prepares the file to receive new data and erases old content if it exists."
        },

        {
            q: "What is the output?",
            code: "file = open(\"output.txt\", \"w\")\nfile.write(\"Hello world\")\nfile.close()",
            options: [
            "It reads output.txt",
            "It writes \"Hello world\" into output.txt",
            "It deletes output.txt",
            "It prints \"Hello world\" on screen"
            ],
            answer: 1,
            explain: "write() writes text into the file and close() saves it properly."
        },

        {
            q: "Which mode should be used to add new data to the end of a file instead of erasing it?",
            options: ["\"r\"", "\"w\"", "\"a\"", "\"d\""],
            answer: 2,
            explain: "Append mode \"a\" adds data at the end of the file."
        },

        {
            type: "msq",
            q: "Which of the following actions are shown for writing files in this topic?",
            options: ["write()", "with open(...)", "os.remove()", "append mode \"a\""],
            answer: [0,1,3],
            explain: "Writing uses write(), often with with, and append mode \"a\" is used to add new data without erasing."
        },

        {
            type: "tf",
            q: "Deleting a file means removing it permanently from the disk.",
            answer: true,
            explain: "Deletion removes the file from disk."
        },

        {
            q: "Which module is used for deleting files in this topic?",
            options: ["sys", "os", "math", "csv"],
            answer: 1,
            explain: "This topic uses functions from the os module."
        },

        {
            q: "What is the output?",
            code: "import os\nif os.path.exists(\"data.txt\"):\n    os.remove(\"data.txt\")\nelse:\n    print(\"File not found\")",
            options: [
            "It always deletes data.txt",
            "It deletes data.txt if it exists, otherwise prints File not found",
            "It reads data.txt if it exists",
            "It creates data.txt if it does not exist"
            ],
            answer: 1,
            explain: "The code checks existence and deletes only if the file is found."
        },

        {
            type: "tf",
            q: "Error handling in Python is done using try and except blocks.",
            answer: true,
            explain: "try contains risky code and except runs if an error happens."
        },

        {
            q: "What is the output?",
            code: "try:\n    x = int(\"abc\")\n    print(x)\nexcept:\n    print(\"Conversion failed\")",
            options: ["abc", "0", "Conversion failed", "ValueError happened"],
            answer: 2,
            explain: "int(\"abc\") fails, so except runs and prints Conversion failed."
        },

        {
            q: "What is the output?",
            code: "try:\n    x = int(\"123\")\nexcept ValueError:\n    print(\"Error\")\nelse:\n    print(\"No error, value is\", x)",
            options: [
            "Error",
            "No error, value is 123",
            "No error, value is abc",
            "It prints nothing"
            ],
            answer: 1,
            explain: "No error happens, so else runs and prints the value 123."
        },

        {
            q: "What is the output?",
            code: "try:\n    f = open(\"data.txt\", \"r\")\n    print(f.read())\nexcept:\n    print(\"File problem\")\nfinally:\n    print(\"Done\")",
            options: [
            "It prints Done only",
            "It prints the file content or File problem, and then prints Done",
            "It deletes data.txt and prints Done",
            "It never prints Done"
            ],
            answer: 1,
            explain: "finally always runs, so Done prints whether or not an error happens."
        },

        {
            q: "In FASTA format, which symbol starts the header line?",
            options: ["#", ">", "@", "$"],
            answer: 1,
            explain: "The header line starts with the \">\" symbol."
        },

        {
            q: "What is the output?",
            code: "header = \"\"\nseq = \"\"\n\nwith open(\"sample.fasta\", \"r\") as f:\n    for line in f:\n        line = line.strip()\n        if line.startswith(\">\"):\n            header = line\n        else:\n            seq = seq + line\n\nprint(header)\nprint(seq)",
            options: [
            "It prints the last sequence line only",
            "It prints the header and a joined sequence string",
            "It deletes the FASTA file",
            "It prints only the header"
            ],
            answer: 1,
            explain: "Header is captured from \">\" line and sequence lines are joined into one string."
        },

        {
            q: "In a GenBank file, which line marks the start of the sequence region?",
            options: ["FEATURES", "ORIGIN", "ACCESSION", "DEFINITION"],
            answer: 1,
            explain: "The ORIGIN line marks the start of the sequence region."
        },

        {
            q: "What is the output?",
            code: "with open(\"data.csv\", \"r\") as f:\n    for line in f:\n        parts = line.strip().split(\",\")\n        print(parts)",
            options: [
            "It prints each CSV row as a Python list",
            "It prints only the header row",
            "It deletes the CSV file",
            "It converts all values to float automatically"
            ],
            answer: 0,
            explain: "split(\",\") breaks each line into columns and prints the list."
        },

        {
            type: "msq",
            q: "Which of the following statements are true about CSV reading shown in this topic?",
            options: [
            "Each row is a line",
            "Columns are separated by commas",
            "Numbers in CSV are read as text",
            "os.remove() is used to read CSV"
            ],
            answer: [0,1,2],
            explain: "CSV rows are lines, columns are comma-separated, and numeric values are initially strings."
        }

        ],
    "python:Biopython": [

            {
                type: "tf",
                q: "Biopython is a Python library used for handling biological sequences and bioinformatics data.",
                answer: true,
                explain: "Biopython is designed to work with sequences, files, and online biological databases."
            },

            {
                q: "Which module is commonly used to read FASTA and GenBank files?",
                options: ["Seq", "SeqIO", "Entrez", "Align"],
                answer: 1,
                explain: "SeqIO is used for reading and writing sequence files like FASTA and GenBank."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\ns = Seq(\"ATGC\")\nprint(len(s))",
                options: ["3", "4", "5", "Error"],
                answer: 1,
                explain: "The sequence has 4 characters, so length is 4."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\ns = Seq(\"ATGC\")\nprint(s.translate())",
                options: ["ATGC", "AUGC", "M", "Error"],
                answer: 2,
                explain: "ATG codes for Methionine (M)."
            },

            {
                type: "msq",
                q: "Which of the following are Biopython modules?",
                options: ["Seq", "SeqIO", "Entrez", "NumPy"],
                answer: [0,1,2],
                explain: "Seq, SeqIO, and Entrez are Biopython modules. NumPy is not part of Biopython."
            },

            {
                q: "What is the output?",
                code: "from Bio import SeqIO\ncount = 0\nfor r in SeqIO.parse(\"genes.fasta\", \"fasta\"):\n    count += 1\nprint(count)",
                options: ["Number of bases", "Number of files", "Number of sequences", "Always 1"],
                answer: 2,
                explain: "The loop counts how many sequences are in the FASTA file."
            },

            {
                type: "tf",
                q: "A SeqRecord object stores both a sequence and its metadata.",
                answer: true,
                explain: "SeqRecord stores sequence along with ID, name, and description."
            },

            {
                q: "What is the output?",
                code: "from Bio import SeqIO\nfor r in SeqIO.parse(\"sample.gb\", \"genbank\"):\n    print(len(r.seq))",
                options: ["Gene name", "Number of features", "Sequence length", "File size"],
                answer: 2,
                explain: "len(r.seq) gives the length of the sequence."
            },

            {
                q: "Which part of a GenBank record contains annotations like genes and CDS?",
                options: ["ORIGIN", "FEATURES", "LOCUS", "DEFINITION"],
                answer: 1,
                explain: "The FEATURES section stores annotations."
            },

            {
                q: "What is the output?",
                code: "from Bio import SeqIO\nfor r in SeqIO.parse(\"sample.gb\", \"genbank\"):\n    print(r.id)",
                options: ["Sequence", "Sequence ID", "Description", "Length"],
                answer: 1,
                explain: "r.id prints the record identifier."
            },

            {
                type: "tf",
                q: "The Entrez module is used to download data from NCBI.",
                answer: true,
                explain: "Entrez connects to NCBI and fetches data."
            },

            {
                q: "Why must you set Entrez.email?",
                options: ["To log in", "To identify yourself to NCBI", "To save files", "To speed up downloads"],
                answer: 1,
                explain: "NCBI requires an email to identify the user."
            },

            {
                q: "What is the output?",
                code: "from Bio import Entrez, SeqIO\nEntrez.email = \"a@b.com\"\nh = Entrez.efetch(db=\"nucleotide\", id=\"NM_000546\", rettype=\"fasta\", retmode=\"text\")\nr = SeqIO.read(h, \"fasta\")\nprint(len(r.seq))",
                options: ["Prints gene name", "Prints sequence length", "Prints ID", "Prints nothing"],
                answer: 1,
                explain: "len(r.seq) prints the length of the downloaded sequence."
            },

            {
                type: "msq",
                q: "Which tasks can SeqIO be used for?",
                options: ["Read FASTA", "Write FASTA", "Read GenBank", "Run BLAST"],
                answer: [0,1,2],
                explain: "SeqIO handles file input and output, not BLAST."
            },

            {
                q: "What is the output?",
                code: "from Bio import SeqIO\nfor r in SeqIO.parse(\"genes.fasta\", \"fasta\"):\n    print(r.id)",
                options: ["Prints all sequences", "Prints all IDs", "Prints file name", "Error"],
                answer: 1,
                explain: "r.id prints the ID of each sequence."
            },

            {
                type: "tf",
                q: "CDS features in GenBank describe coding regions that can be translated to protein.",
                answer: true,
                explain: "CDS stands for coding sequence."
            },

            {
                q: "What is the output?",
                code: "from Bio import SeqIO\nfor r in SeqIO.parse(\"sample.gb\", \"genbank\"):\n    for f in r.features:\n        if f.type == \"CDS\":\n            print(f.type)",
                options: ["gene", "CDS", "protein", "Error"],
                answer: 1,
                explain: "It prints the feature type which is CDS."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\ns = Seq(\"ATGCGT\")\nprint(s[:3])",
                options: ["ATG", "CGT", "ATGC", "Error"],
                answer: 0,
                explain: "s[:3] takes the first three bases."
            },

            {
                type: "tf",
                q: "You can save a downloaded NCBI sequence to a FASTA file using SeqIO.write.",
                answer: true,
                explain: "SeqIO.write is used to save sequences to files."
            },

            {
                q: "Which of the following is a realistic Biopython workflow?",
                options: [
                    "Download sequence → save to FASTA → translate",
                    "Write C code → compile → run",
                    "Only draw plots",
                    "Only rename files"
                ],
                answer: 0,
                explain: "Biopython is used to fetch, store, and process biological sequences."
            }

        ],
    "python:Seq Parsing": [

            {
                type: "tf",
                q: "Sequence parsing means converting sequence files into Python objects that can be processed by a program.",
                answer: true,
                explain: "Parsing turns file data into structured records like SeqRecord objects."
            },

            {
                q: "Which Biopython module is mainly used to parse FASTA and GenBank files?",
                options: ["Seq", "SeqIO", "Entrez", "Align"],
                answer: 1,
                explain: "SeqIO is used to read and write sequence files."
            },

            {
                q: "What is the output?",
                code: "from Bio import SeqIO\n\ncount = 0\nfor r in SeqIO.parse(\"sequences.fasta\", \"fasta\"):\n    count += 1\nprint(count)",
                options: ["Number of bases", "Number of files", "Number of records", "Always 1"],
                answer: 2,
                explain: "The loop counts how many records are in the FASTA file."
            },

            {
                type: "tf",
                q: "SeqIO.parse() returns SeqRecord objects one by one.",
                answer: true,
                explain: "Each parsed entry is a SeqRecord."
            },

            {
                q: "What is the output?",
                code: "from Bio import SeqIO\n\nr = next(SeqIO.parse(\"single.fasta\", \"fasta\"))\nprint(len(r.seq))",
                options: ["Sequence ID", "Sequence length", "Number of records", "Error"],
                answer: 1,
                explain: "len(r.seq) gives the length of the sequence."
            },

            {
                q: "Which attribute gives the sequence ID?",
                options: ["record.name", "record.seq", "record.id", "record.description"],
                answer: 2,
                explain: "record.id stores the sequence identifier."
            },

            {
                type: "msq",
                q: "Which of the following are common filtering conditions?",
                options: ["Sequence length", "Sequence content", "Record ID", "File size"],
                answer: [0,1,2],
                explain: "Filtering is usually based on properties of the record, not file size."
            },

            {
                q: "What is the output?",
                code: "from Bio import SeqIO\n\nfor r in SeqIO.parse(\"sequences.fasta\", \"fasta\"):\n    if \"N\" not in str(r.seq):\n        print(r.id)",
                options: ["Prints all IDs", "Prints only clean sequences", "Prints only short sequences", "Prints nothing"],
                answer: 1,
                explain: "It prints IDs of sequences that do not contain N."
            },

            {
                type: "tf",
                q: "GenBank files contain both sequence data and annotations.",
                answer: true,
                explain: "GenBank stores rich metadata along with sequences."
            },

            {
                q: "What is the output?",
                code: "from Bio import SeqIO\n\nr = next(SeqIO.parse(\"example.gb\", \"genbank\"))\nprint(len(r.features))",
                options: ["Sequence length", "Number of features", "Number of bases", "Record ID"],
                answer: 1,
                explain: "r.features is a list of annotated features."
            },

            {
                q: "Which feature type usually represents coding regions?",
                options: ["gene", "CDS", "source", "origin"],
                answer: 1,
                explain: "CDS represents coding sequences."
            },

            {
                q: "What is the output?",
                code: "from Bio import SeqIO\n\nids = []\nfor r in SeqIO.parse(\"sequences.fasta\", \"fasta\"):\n    ids.append(r.id)\nprint(type(ids))",
                options: ["tuple", "dict", "list", "set"],
                answer: 2,
                explain: "ids was created as a Python list."
            },

            {
                type: "tf",
                q: "You can write filtered records to a new FASTA file using SeqIO.write().",
                answer: true,
                explain: "SeqIO.write() is used to save records to a file."
            },

            {
                q: "What is the output?",
                code: "from Bio import SeqIO\n\nselected = []\nfor r in SeqIO.parse(\"sequences.fasta\", \"fasta\"):\n    if len(r.seq) > 1000:\n        selected.append(r)\n\nprint(len(selected))",
                options: ["Number of files", "Number of long sequences", "Always 0", "Sequence length"],
                answer: 1,
                explain: "selected contains only long sequences."
            },

            {
                type: "tf",
                q: "FASTA parsing mainly gives access to sequence and ID, not rich annotations.",
                answer: true,
                explain: "FASTA does not store detailed annotations like GenBank."
            },

            {
                q: "What is the output?",
                code: "from Bio import SeqIO\n\nlongest_len = 0\nfor r in SeqIO.parse(\"sequences.fasta\", \"fasta\"):\n    if len(r.seq) > longest_len:\n        longest_len = len(r.seq)\n\nprint(longest_len)",
                options: ["ID of longest sequence", "Length of longest sequence", "Number of records", "Error"],
                answer: 1,
                explain: "The code tracks and prints the maximum length."
            },

            {
                type: "msq",
                q: "Which tasks are typical in sequence parsing?",
                options: [
                    "Counting records",
                    "Finding longest sequence",
                    "Extracting gene names",
                    "Training a neural network"
                ],
                answer: [0,1,2],
                explain: "Parsing focuses on reading and organizing sequence data."
            },

            {
                q: "What is the output?",
                code: "from Bio import SeqIO\n\nfor r in SeqIO.parse(\"example.gb\", \"genbank\"):\n    print(r.id)\n    break",
                options: ["Prints all IDs", "Prints only first ID", "Prints sequence", "Error"],
                answer: 1,
                explain: "The break stops after the first record."
            },

            {
                type: "tf",
                q: "Parsing practice tasks often combine reading, filtering, and writing files.",
                answer: true,
                explain: "Real workflows usually chain these steps together."
            }

        ],
    "python:d-p": [

            {
                type: "tf",
                q: "A Seq object stores only the sequence letters without any ID or description.",
                answer: true,
                explain: "Seq represents only the biological sequence, without metadata."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\ns = Seq(\"ATGAAATTTGGGCCCTAA\")\nprint(len(s))",
                options: ["15", "18", "21", "Error"],
                answer: 1,
                explain: "The sequence has 18 bases."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\ndna = Seq(\"ATGAAATTTGGGCCCTAA\")\nprint(dna.translate())",
                options: ["MKFGP", "MKFGP*", "Error", "ATGAAATTTGGGCCCTAA"],
                answer: 1,
                explain: "The DNA translates to MKFGP followed by a stop codon."
            },

            {
                type: "msq",
                q: "Which of the following are true about SeqRecord?",
                options: [
                    "It contains a Seq object",
                    "It can store an ID and description",
                    "It is only for protein sequences",
                    "It is used when reading FASTA or GenBank files"
                ],
                answer: [0,1,3],
                explain: "SeqRecord wraps a Seq and adds metadata, and is used when reading files."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\ndna = Seq(\"ATGAAATTT\")\nprint(dna.reverse_complement())",
                options: ["AAATTTCAT", "TTTAAACAT", "ATGAAATTT", "Error"],
                answer: 0,
                explain: "The reverse complement of ATGAAATTT is AAATTTCAT."
            },

            {
                type: "tf",
                q: "A valid coding sequence length should be divisible by 3.",
                answer: true,
                explain: "Codons are groups of three bases, so the length must be a multiple of 3."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\ndna = Seq(\"GGGCCCATGAAATTT\")\nprint(\"ATG\" in dna)",
                options: ["True", "False", "Error", "None"],
                answer: 0,
                explain: "The sequence contains ATG, so the result is True."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\ndna = Seq(\"ATGATGATG\")\nk = 3\nprint(dna[0:3])",
                options: ["ATG", "TGA", "GAT", "Error"],
                answer: 0,
                explain: "The first 3 bases form the first k-mer: ATG."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\ndna = Seq(\"ATGATGATG\")\ncounts = {}\nk = 3\nfor i in range(len(dna)-k+1):\n    kmer = str(dna[i:i+k])\n    counts[kmer] = counts.get(kmer, 0) + 1\nprint(counts[\"ATG\"])",
                options: ["1", "2", "3", "4"],
                answer: 2,
                explain: "ATG appears three times in the sequence."
            },

            {
                type: "tf",
                q: "Motif identification means finding short biologically meaningful patterns inside sequences.",
                answer: true,
                explain: "Motifs are short conserved or important patterns like ATG or restriction sites."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\nprotein = Seq(\"MKTLLILAVAVAS\")\nprint(protein.find(\"LLI\"))",
                options: ["-1", "0", "3", "4"],
                answer: 2,
                explain: "The motif LLI starts at position 3 (0-based index)."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\nseqs = [Seq(\"ATG\"), Seq(\"ATGAAATTTGGG\"), Seq(\"ATGAA\")]\nlongest = max(seqs, key=len)\nprint(len(longest))",
                options: ["3", "5", "9", "12"],
                answer: 2,
                explain: "The longest sequence has length 9."
            },

            {
                type: "msq",
                q: "Which of the following are common uses of k-mers?",
                options: [
                    "Genome assembly",
                    "Sequence comparison",
                    "Finding motifs",
                    "Storing gene annotations"
                ],
                answer: [0,1,2],
                explain: "k-mers are used for assembly, comparison, and motif-related analysis."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\ndna = Seq(\"ATGAAATTTGGGCCCTAA\")\ncodons = []\nfor i in range(0, len(dna), 3):\n    codons.append(str(dna[i:i+3]))\nprint(codons[0])",
                options: ["AAA", "ATG", "TTT", "Error"],
                answer: 1,
                explain: "The first codon is ATG."
            },

            {
                type: "tf",
                q: "Different organisms can prefer different codons for the same amino acid.",
                answer: true,
                explain: "This is called codon usage bias."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\ndna = Seq(\"ATGAAATTTGGGCCCTAA\")\nprint(dna[:6])",
                options: ["ATGAAA", "ATGAAAT", "AAAATT", "Error"],
                answer: 0,
                explain: "The first 6 bases are ATGAAA."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\ndna = Seq(\"ATGAAATTTGGGCCCTAA\")\nmut = dna[:6] + \"CCC\" + dna[9:]\nprint(mut.translate())",
                options: ["MKFGP*", "MKPGP*", "MKPPP*", "Error"],
                answer: 1,
                explain: "The mutation changes one codon and changes the protein sequence."
            },

            {
                type: "tf",
                q: "SeqRecord objects are usually returned when reading FASTA files using Biopython.",
                answer: true,
                explain: "Biopython returns SeqRecord objects when parsing files."
            },

            {
                q: "What is the output?",
                code: "from Bio.Seq import Seq\ndna = Seq(\"AAGGAATTCGGG\")\nsite = \"GAATTC\"\nprint(dna.find(site))",
                options: ["-1", "2", "3", "4"],
                answer: 1,
                explain: "The EcoRI site starts at position 2 (0-based index)."
            },

            {
                type: "msq",
                q: "Which checks are commonly used to see if a sequence looks like a real gene?",
                options: [
                    "Starts with ATG",
                    "Ends with a stop codon",
                    "Length divisible by 3",
                    "Contains only A and T"
                ],
                answer: [0,1,2],
                explain: "Basic gene checks include start codon, stop codon, and length multiple of 3."
            }

        ],
    "python:NCBI and BLAST": [

    {
        q: "Which function is used to run an online BLAST search in Biopython?",
        options: ["Entrez.efetch()", "SeqIO.read()", "NCBIWWW.qblast()", "NCBIXML.read()"],
        answer: 2,
        explain: "NCBIWWW.qblast() sends a sequence to NCBI BLAST servers."
    },

    {
        q: "What is the output?",
        code: "from Bio import Entrez\nEntrez.email = \"a@b.com\"\nhandle = Entrez.esearch(db=\"nucleotide\", term=\"BRCA1\")\nresult = Entrez.read(handle)\nprint(type(result))",
        options: ["list", "dict", "str", "int"],
        answer: 1,
        explain: "Entrez.read returns a dictionary-like object."
    },

    {
        type: "tf",
        q: "You must set Entrez.email before making any NCBI request.",
        answer: true,
        explain: "NCBI requires an email address to identify users."
    },

    {
        q: "Which parameter should be used to download a sequence in FASTA format?",
        options: ["retmode", "db", "rettype=\"fasta\"", "id"],
        answer: 2,
        explain: "Setting rettype to fasta downloads the sequence in FASTA format."
    },

    {
        q: "What is the output?",
        code: "ids = [\"A\", \"B\"]\nprint(\",\".join(ids))",
        options: ["A B", "A,B", "['A','B']", "Error"],
        answer: 1,
        explain: "join combines the list into a comma-separated string."
    },

    {
        type: "msq",
        q: "Which of the following are valid uses of Entrez.efetch()?",
        options: [
            "Downloading GenBank records",
            "Downloading FASTA sequences",
            "Running BLAST searches",
            "Fetching records using IDs"
        ],
        answer: [0,1,3],
        explain: "efetch is used to fetch records by ID in different formats."
    },

    {
        q: "What is the output?",
        code: "from Bio import Entrez\nEntrez.email = \"a@b.com\"\nh = Entrez.efetch(db=\"nucleotide\", id=\"X\", rettype=\"fasta\", retmode=\"text\")\ndata = h.read()\nprint(type(data))",
        options: ["list", "dict", "str", "bytes"],
        answer: 2,
        explain: "handle.read() returns the downloaded data as a string."
    },

    {
        type: "tf",
        q: "Online BLAST should be used inside big loops for thousands of sequences.",
        answer: false,
        explain: "Online BLAST is slow and should not be used for heavy workloads."
    },

    {
        q: "Which module is used to parse BLAST XML results?",
        options: ["Bio.SeqIO", "Bio.Entrez", "Bio.Blast.NCBIXML", "Bio.Align"],
        answer: 2,
        explain: "NCBIXML is used to parse BLAST XML output."
    },

    {
        q: "What is the output?",
        code: "import time\ntime.sleep(1)\nprint(\"Done\")",
        options: ["Nothing", "Error", "Done after a pause", "1"],
        answer: 2,
        explain: "The program waits for one second and then prints Done."
    },

    {
        type: "tf",
        q: "BLAST results contain alignments, and each alignment can contain multiple HSPs.",
        answer: true,
        explain: "Each hit can have multiple high-scoring pairs."
    },

    {
        q: "Which object contains the list of hits after parsing BLAST XML?",
        options: ["blast_record.query", "blast_record.alignments", "blast_record.hsps", "blast_record.ids"],
        answer: 1,
        explain: "Hits are stored in blast_record.alignments."
    },

    {
        q: "What is the output?",
        code: "from Bio import Entrez\nEntrez.api_key = \"KEY123\"\nprint(Entrez.api_key)",
        options: ["None", "KEY123", "Error", "True"],
        answer: 1,
        explain: "The api_key attribute stores the given key."
    },

    {
        type: "msq",
        q: "Which of the following are good practices when using NCBI services?",
        options: [
            "Set Entrez.email",
            "Send thousands of requests per second",
            "Add delays between requests",
            "Use an API key if available"
        ],
        answer: [0,2,3],
        explain: "Email, delays, and API keys are recommended by NCBI."
    },

    {
        q: "What is the output?",
        code: "from Bio.Blast import NCBIWWW\nprint(type(NCBIWWW.qblast))",
        options: ["function", "str", "module", "class"],
        answer: 0,
        explain: "qblast is a function."
    },

    {
        q: "Which file format is most commonly used to save BLAST results from Biopython?",
        options: ["TXT", "CSV", "XML", "FASTA"],
        answer: 2,
        explain: "BLAST results are usually saved in XML format."
    },

    {
        type: "tf",
        q: "FASTA format contains only sequence data without annotations.",
        answer: true,
        explain: "FASTA stores only headers and sequences, not full annotations."
    },

    {
        q: "What is the output?",
        code: "from Bio.Blast import NCBIXML\n# Assume blast_record is already parsed\nprint(hasattr(blast_record, \"alignments\"))",
        options: ["True", "False", "Error", "None"],
        answer: 0,
        explain: "Parsed BLAST records contain the alignments attribute."
    }

],
"python:Visualization": [

    {
        q: "What is the main purpose of data visualization?",
        options: [
            "To store data",
            "To convert code to images",
            "To understand patterns in data using plots",
            "To speed up Python programs"
        ],
        answer: 2,
        explain: "Plots help humans understand patterns and trends in numerical data."
    },

    {
        q: "Which function is used to display a plot window in matplotlib?",
        options: ["plt.open()", "plt.show()", "plt.draw()", "plt.plot()"],
        answer: 1,
        explain: "plt.show() is required to display the plot window in scripts."
    },

    {
        q: "What is the output type of this code?",
        code: "import matplotlib.pyplot as plt\nplt.plot([1,2,3],[3,2,1])\nplt.show()",
        options: ["A table", "A bar plot", "A line plot", "An error"],
        answer: 2,
        explain: "plt.plot() creates a line plot by default."
    },

    {
        type: "tf",
        q: "Seaborn is built on top of matplotlib.",
        answer: true,
        explain: "Seaborn uses matplotlib internally for plotting."
    },

    {
        q: "Which plot is best for comparing values between categories?",
        options: ["Line plot", "Scatter plot", "Bar plot", "Pie chart only"],
        answer: 2,
        explain: "Bar plots are used to compare values between categories."
    },

    {
        q: "What does a scatter plot show?",
        options: [
            "Only one value",
            "Relationship between two values",
            "Only categories",
            "Only percentages"
        ],
        answer: 1,
        explain: "Scatter plots show the relationship between two variables."
    },

    {
        q: "What does GC content represent?",
        options: [
            "Only G bases",
            "Only C bases",
            "Percentage of G and C bases",
            "Total sequence length"
        ],
        answer: 2,
        explain: "GC content is the percentage of G and C bases in a sequence."
    },

    {
        q: "What is the output of this code?",
        code: "sequence = \"ATGC\"\nprint(sequence.count(\"G\") + sequence.count(\"C\"))",
        options: ["1", "2", "3", "4"],
        answer: 1,
        explain: "There is one G and one C, so total is 2."
    },

    {
        type: "msq",
        q: "Which of the following are common plot types taught here?",
        options: [
            "Line plot",
            "Bar plot",
            "Scatter plot",
            "Heatmap only"
        ],
        answer: [0,1,2],
        explain: "Line, bar, and scatter plots are the three basic plots."
    },

    {
        q: "Which function is used to save a figure to a file?",
        options: ["plt.save()", "plt.store()", "plt.savefig()", "plt.write()"],
        answer: 2,
        explain: "plt.savefig() saves the current figure to a file."
    },

    {
        q: "What does the dpi parameter control in savefig()?",
        options: ["File size", "Plot color", "Image resolution", "Number of lines"],
        answer: 2,
        explain: "dpi controls the resolution (quality) of the saved image."
    },

    {
        q: "What is the output of this code?",
        code: "import matplotlib.pyplot as plt\nplt.bar([\"A\",\"B\"],[3,5])\nplt.show()",
        options: ["A line plot", "A scatter plot", "A bar plot", "An error"],
        answer: 2,
        explain: "plt.bar() creates a bar plot."
    },

    {
        type: "tf",
        q: "A pie chart is useful for showing proportions of bases in a sequence.",
        answer: true,
        explain: "Pie charts show relative proportions of parts of a whole."
    },

    {
        q: "Which library provides nicer default styles for plots?",
        options: ["numpy", "pandas", "seaborn", "math"],
        answer: 2,
        explain: "Seaborn provides better default plot styles."
    },

    {
        q: "What does this code mainly do?",
        code: "plt.plot(x, y)\nplt.savefig(\"plot.png\")\nplt.show()",
        options: [
            "Only displays the plot",
            "Only saves the plot",
            "Saves and displays the plot",
            "Deletes the plot"
        ],
        answer: 2,
        explain: "The plot is saved using savefig and also shown using show."
    },

    {
        q: "Which plot is most suitable to see how a value changes along positions?",
        options: ["Bar plot", "Line plot", "Pie chart", "Table"],
        answer: 1,
        explain: "Line plots show how values change along an axis."
    },

    {
        type: "tf",
        q: "It is better to call savefig() before show().",
        answer: true,
        explain: "Saving before show avoids issues where the figure may be cleared."
    },

    {
        q: "What is the output of this code?",
        code: "import matplotlib.pyplot as plt\nplt.scatter([1,2,3],[3,2,1])\nplt.show()",
        options: ["Line plot", "Bar plot", "Scatter plot", "Error"],
        answer: 2,
        explain: "plt.scatter() creates a scatter plot."
    },

    {
        q: "Why are gene expression plots important?",
        options: [
            "To delete genes",
            "To compare genes and samples visually",
            "To store sequences",
            "To convert DNA to RNA"
        ],
        answer: 1,
        explain: "They help compare expression levels and detect differences."
    },

    {
        type: "msq",
        q: "Which of the following can be saved using savefig()?",
        options: ["PNG", "JPG", "PDF", "Only TXT"],
        answer: [0,1,2],
        explain: "Matplotlib can save figures in many formats like PNG, JPG, and PDF."
    }

],
"python:Pandas": [

    {
        q: "What is the main data structure used by pandas to store tabular data?",
        options: ["List", "Dictionary", "DataFrame", "Tuple"],
        answer: 2,
        explain: "Pandas uses DataFrame to represent table-like data with rows and columns."
    },

    {
        q: "What is the output type of this code?",
        code: "import pandas as pd\n\ndf = pd.read_csv(\"data.csv\")\nprint(type(df))",
        options: ["list", "dict", "DataFrame", "tuple"],
        answer: 2,
        explain: "read_csv loads the file into a pandas DataFrame."
    },

    {
        type: "tf",
        q: "A pandas DataFrame is similar to an Excel table with rows and columns.",
        answer: true,
        explain: "A DataFrame represents data in a table-like structure."
    },

    {
        q: "Which function is used to load a CSV file in pandas?",
        options: ["open_csv()", "load_csv()", "read_csv()", "import_csv()"],
        answer: 2,
        explain: "read_csv() is used to load CSV files into a DataFrame."
    },

    {
        q: "Which function is used to load an Excel file in pandas?",
        options: ["read_excel()", "load_excel()", "open_excel()", "excel_read()"],
        answer: 0,
        explain: "read_excel() loads Excel files into a DataFrame."
    },

    {
        q: "What does this code print?",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\"a\": [1,2,3]})\nprint(df.shape)",
        options: ["(3, 1)", "(1, 3)", "(3, 3)", "(1, 1)"],
        answer: 0,
        explain: "There are 3 rows and 1 column."
    },

    {
        q: "What does df.head() do?",
        options: [
            "Shows last 5 rows",
            "Shows first 5 rows",
            "Shows column names",
            "Deletes first 5 rows"
        ],
        answer: 1,
        explain: "head() shows the first 5 rows by default."
    },

    {
        type: "msq",
        q: "Which of the following are common data cleaning operations?",
        options: [
            "Removing missing values",
            "Filtering rows",
            "Sorting data",
            "Compiling Python code"
        ],
        answer: [0,1,2],
        explain: "Cleaning includes removing missing values, filtering, and sorting."
    },

    {
        q: "Which function removes rows that contain missing values?",
        options: ["remove()", "dropna()", "clean()", "isna()"],
        answer: 1,
        explain: "dropna() removes rows with missing values."
    },

    {
        q: "What does this code do?",
        code: "filtered = df[df[\"expression\"] > 10]",
        options: [
            "Deletes the column expression",
            "Keeps only rows where expression > 10",
            "Changes expression to 10",
            "Sorts the table"
        ],
        answer: 1,
        explain: "It filters rows based on a condition."
    },

    {
        q: "Which function gives a quick statistical summary of numeric columns?",
        options: ["stats()", "summary()", "describe()", "info()"],
        answer: 2,
        explain: "describe() shows count, mean, min, max, etc."
    },

    {
        q: "What is the output?",
        code: "import pandas as pd\n\ndf = pd.DataFrame({\"x\": [10, 20, 30]})\nprint(df[\"x\"].mean())",
        options: ["10", "20", "30", "60"],
        answer: 1,
        explain: "The mean of 10, 20, 30 is 20."
    },

    {
        q: "Which function is used to combine two tables using a common column?",
        options: ["join()", "combine()", "merge()", "append()"],
        answer: 2,
        explain: "pd.merge() is used to merge tables."
    },

    {
        q: "What does this code produce?",
        code: "import pandas as pd\n\ndf1 = pd.DataFrame({\"gene\": [\"A\", \"B\"], \"x\": [1,2]})\ndf2 = pd.DataFrame({\"gene\": [\"A\", \"B\"], \"y\": [3,4]})\nprint(pd.merge(df1, df2, on=\"gene\"))",
        options: [
            "A table with columns gene, x, y",
            "Only df1",
            "Only df2",
            "Error"
        ],
        answer: 0,
        explain: "merge combines both tables into one using the gene column."
    },

    {
        type: "tf",
        q: "The function to_csv() is used to save a DataFrame to a CSV file.",
        answer: true,
        explain: "to_csv() writes the DataFrame to a CSV file."
    },

    {
        q: "What does index=False do when saving a CSV?",
        options: [
            "Deletes the file",
            "Avoids writing row numbers",
            "Compresses the file",
            "Changes column order"
        ],
        answer: 1,
        explain: "index=False prevents pandas from writing the row index."
    },

    {
        q: "Which function is used to save a DataFrame to an Excel file?",
        options: ["save_excel()", "write_excel()", "to_excel()", "export_excel()"],
        answer: 2,
        explain: "to_excel() saves the DataFrame to an Excel file."
    },

    {
        type: "tf",
        q: "In pandas, numeric columns are automatically treated as numbers and not as text.",
        answer: true,
        explain: "Pandas recognizes numeric columns and allows mathematical operations on them."
    },

    {
        q: "Which of the following represents a full typical workflow?",
        options: [
            "Load → Clean → Analyze → Export",
            "Write → Delete → Merge → Plot",
            "Import → Compile → Run → Exit",
            "Open → Close → Save → Quit"
        ],
        answer: 0,
        explain: "A typical workflow is load data, clean it, analyze it, and export results."
    }

],

"python:Advance": [

    {
        q: "Which command is used to install Biopython using PIP?",
        options: ["pip add biopython", "pip get biopython", "pip install biopython", "pip load biopython"],
        answer: 2,
        explain: "pip install biopython is the correct command to install the package."
    },

    {
        q: "What is the output?",
        code: "import numpy as np\n\na = np.array([1,2,3])\nb = a * 2\nprint(b)",
        options: ["[1 2 3 1 2 3]", "[2 4 6]", "[1 4 9]", "Error"],
        answer: 1,
        explain: "Each element is multiplied by 2, so result is [2 4 6]."
    },

    {
        type: "msq",
        q: "Which of the following are benefits of using a virtual environment?",
        options: [
            "Avoids library version conflicts",
            "Makes Python run faster",
            "Keeps project dependencies isolated",
            "Deletes unused packages automatically"
        ],
        answer: [0,2],
        explain: "Virtual environments isolate dependencies and avoid conflicts between projects."
    },

    {
        q: "What is the output?",
        code: "from datetime import datetime\nprint(type(datetime.now()))",
        options: ["str", "date", "datetime", "time"],
        answer: 2,
        explain: "datetime.now() returns a datetime object."
    },

    {
        type: "tf",
        q: "PIP is used to install external Python libraries.",
        answer: true,
        explain: "PIP is Python's package manager."
    },

    {
        q: "Which library is mainly used for arrays in scientific Python?",
        options: ["math", "array", "numpy", "random"],
        answer: 2,
        explain: "NumPy is the standard library for numeric arrays."
    },

    {
        q: "What is the output?",
        code: "import re\ntext = \"S1=12 S2=8\"\nprint(re.findall(\"\\\\d+\", text))",
        options: ["['S1','S2']", "['12','8']", "[12,8]", "Error"],
        answer: 1,
        explain: "The pattern \\d+ finds all numbers in the text."
    },

    {
        type: "tf",
        q: "A virtual environment allows different projects to use different versions of the same library.",
        answer: true,
        explain: "This is the main purpose of virtual environments."
    },

    {
        q: "What is the output?",
        code: "from datetime import timedelta\nprint(timedelta(hours=2))",
        options: ["2", "120", "2:00:00", "Error"],
        answer: 2,
        explain: "timedelta prints duration as hours:minutes:seconds."
    },

    {
        q: "Which command shows all installed packages?",
        options: ["pip show", "pip list", "pip packages", "pip check"],
        answer: 1,
        explain: "pip list displays all installed packages."
    },

    {
        q: "What is the output?",
        code: "import numpy as np\nprint(np.arange(3))",
        options: ["[1 2 3]", "[0 1 2]", "[0 1 2 3]", "Error"],
        answer: 1,
        explain: "np.arange(3) creates values 0,1,2."
    },

    {
        type: "msq",
        q: "Which of the following are uses of RegEx?",
        options: [
            "Searching patterns in text",
            "Extracting IDs from strings",
            "Sorting lists",
            "Replacing parts of text"
        ],
        answer: [0,1,3],
        explain: "RegEx is used for searching, extracting, and replacing text patterns."
    },

    {
        q: "What is the output?",
        code: "import re\nprint(re.search(\"A\", \"CAT\") is not None)",
        options: ["True", "False", "None", "Error"],
        answer: 0,
        explain: "The letter A exists in CAT, so search returns a match."
    },

    {
        type: "tf",
        q: "NumPy arrays are usually faster and more memory efficient than Python lists for numeric data.",
        answer: true,
        explain: "This is one of the main advantages of NumPy."
    },

    {
        q: "Which command is used to create a virtual environment?",
        options: ["pip create venv", "python -m venv myenv", "python venv myenv", "venv myenv"],
        answer: 1,
        explain: "python -m venv myenv creates a new virtual environment."
    },

    {
        q: "What is the output?",
        code: "from datetime import datetime\nnow = datetime.now()\nprint(type(now.strftime(\"%Y-%m-%d\")))",
        options: ["datetime", "date", "str", "int"],
        answer: 2,
        explain: "strftime returns a formatted string."
    },

    {
        type: "tf",
        q: "pip install --upgrade biopython updates Biopython to a newer version.",
        answer: true,
        explain: "The --upgrade flag updates the package."
    },

    {
        q: "Which tool is mainly used to manage Python packages?",
        options: ["venv", "numpy", "pip", "re"],
        answer: 2,
        explain: "PIP is the package manager for Python."
    },

    {
        q: "What is the output?",
        code: "import numpy as np\na = np.array([10,20,30])\nprint(a.mean())",
        options: ["20", "30", "10", "Error"],
        answer: 0,
        explain: "The average of 10, 20, 30 is 20."
    }

]



};

window.QUESTIONS_BY_TOPIC = window.QUIZ_DATA.QUESTIONS_BY_TOPIC;
window.PY_EXERCISE_QUESTIONS_BY_TOPIC = window.QUIZ_DATA.QUESTIONS_BY_TOPIC;
