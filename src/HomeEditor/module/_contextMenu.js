import * as THREE from "three";
import { removeItem, removeRoom,  rotateObjectHorizon, rotateObjectVertical } from "./_common";
import './_contextMenu.css'

export const contextMenu = (target, context_target, edit_mode, view_mode, event, drag_target) => {
    if (view_mode === 3) return; // only work at 2d mode
    if (target.length === 0) { // 
        removeContextMenu(context_target);
        return;
    }
    if (context_target !== 0) removeContextMenu(context_target);

    switch (edit_mode) {
        case "room" :
            //roomContextMenu(target, context_target, drag_target, event);
            break;
        case "item" :
            itemContextMenu(target, context_target, drag_target, event);
            break;
        default :
            break;
    }
}

const roomContextMenu = (target, context_target, drag_target, event) => {
    if (context_target !== 0) return;

    context_target.push(target[0].object);

    const div = document.createElement('div');
    div.className = 'contextmenu';
    div.id = 'contextmenu'
    div.textContent = 'Remove'
    div.style.backgroundColor = "white";
    div.style.left = event.pageX - 40 + 'px';
    div.style.top = event.pageY - 40 + 'px';

    document.body.appendChild(div);

    div.addEventListener("click", () => {
        removeRoom(target, drag_target);
        context_target.pop();
        div.parentNode.removeChild(div);
    })
}

const itemContextMenu = (target, context_target, drag_target,  event) => {
    if (context_target.length !== 0) return;

    if (target[0].object.name.split("_")[0] !== "load") return;

    context_target.push(target[0].object);

    const div = document.createElement('div');
    div.className = 'contextmenu';
    div.id = 'contextmenu'
    div.style.backgroundColor = "white";
    div.style.left = event.pageX - 40 + 'px';
    div.style.top = event.pageY - 40 + 'px';

    //가구에 대한 동작 UI 버튼
    const removeDiv = document.createElement('div');
    removeDiv.className = 'contextmenu-button-left';
    removeDiv.textContent = 'R';
    div.appendChild(removeDiv);

    const verticalDiv = document.createElement('div');
    verticalDiv.className = 'contextmenu-button';
    verticalDiv.textContent = 'V';
    div.appendChild(verticalDiv);

    const horizonDiv = document.createElement('div');
    horizonDiv.className = 'contextmenu-button';
    horizonDiv.textContent = 'H';
    div.appendChild(horizonDiv);

    const closeDiv = document.createElement('div');
    closeDiv.className = 'contextmenu-button-right';
    closeDiv.textContent = 'C';
    div.appendChild(closeDiv);

    document.body.appendChild(div);

    removeDiv.addEventListener("click", () => {
        removeItem(target, drag_target);
        context_target.pop();
        div.parentNode.removeChild(div);
    });

    verticalDiv.addEventListener("click", () => {
        rotateObjectVertical(target);
    });

    horizonDiv.addEventListener("click", () => {
        rotateObjectHorizon(target);
    })

    closeDiv.addEventListener("click", () => {
        context_target.pop();
        div.parentNode.removeChild(div);
    })

}

export const removeContextMenu = (context_target) => {
    if (context_target.length === 0) return;
    if (!!document.getElementById('contextmenu') === false) return;

    context_target.pop();
    const div = document.getElementById('contextmenu');
    div.parentNode.removeChild(div);
}