export default function draggable(component) {
  function onmousedown(e) {
    component.addEventListener('mousemove', onmousemove);
    component.addEventListener('mouseleave', onmouseup);
  }

  function onmousemove(e) {
    if (e.movementX !== 0 || e.movementY !== 0) {
      const event = new Event('mousedrag');
      event.movementX = e.movementX;
      event.movementY = e.movementY;
      component.dispatchEvent(event);
    }
  }

  function onmouseup(e) {
    component.removeEventListener('mousemove', onmousemove);
    component.removeEventListener('mouseleave', onmouseup);
  }

  component.addEventListener('mousedown', onmousedown);
  component.addEventListener('mouseup', onmouseup);
  return component;
}
