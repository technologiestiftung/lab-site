import embedResize from './modules/embed-resize.js';
import Timeline from './modules/Timeline.js';

function createTimeline(idTimelineDiv) {
  const div = document.getElementById(idTimelineDiv);
  if (div !== null) {
    projectTimeline = new Timeline(div);
    projectTimeline.init();
  }
}

let projectTimeline;

document.addEventListener('DOMContentLoaded', function() {

  createTimeline('timeline');
});

window.addEventListener('resize', evt => {
  if (projectTimeline !== undefined) {
    projectTimeline.onResize();
  }
  embedResize();
});

embedResize();
