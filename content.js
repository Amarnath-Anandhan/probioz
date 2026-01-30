function toggleSubtopics(topicId) {
  const subtopicList = document.getElementById(topicId);
  subtopicList.style.display = subtopicList.style.display === 'block' ? 'none' : 'block';
}

function showContent(subtopicId) {
  const allSections = document.querySelectorAll('.content-section');
  allSections.forEach(section => section.style.display = 'none');

  const selected = document.getElementById(subtopicId);
  if (selected) {
    selected.style.display = 'block';
  }
}
