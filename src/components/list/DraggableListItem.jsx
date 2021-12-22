import React, { useRef} from 'react'
import PropTypes from 'prop-types'

const DraggableListItem = props => {
    const itemRef = useRef(null);

    const onDragStart = (e) => {
        e.dataTransfer.effectedAllowed = "move";
        e.dataTransfer.setDragImage(e.target, 50000 , 50000);

        let ghostNode = e.target.cloneNode(true);
        ghostNode.style.position = "absolute";

        // show ghost add mouse pointer position
        ghostNode.style.top = (e.pageY - e.target.offsetHeight /2) + 'px';
        ghostNode.style.left = (e.pageX - e.target.offsetWidth /2) + 'px';
        
        // add some style
        ghostNode.style.opacity = '0.8';
        ghostNode.style.pointerEvents = 'none';

        // add id
        ghostNode.id = 'ghostNode';

        // identify selected item
        itemRef.current.classList.add('dragstart');

        // add width height to ghost node
        ghostNode.style.height = e.target.offsetHeight + 'px';
        ghostNode.style.width = e.target.offsetWidth + 'px';

        
        document.body.appendChild(ghostNode);

        if (props.onDragStart) {
            props.onDragStart(props.index)
        }
    }

    const onDrag = e =>{
        let ghostNode = document.querySelector('#ghostNode');
        ghostNode.style.top = (e.pageY - e.target.offsetHeight /2) + 'px';
        ghostNode.style.left = (e.pageX - e.target.offsetWidth /2) + 'px';
    }

    const onDragEnd = e =>{
        document.querySelector('#ghostNode').remove();
        itemRef.current.classList.remove('dragstart');
    }

    const onDragEnter = e =>{
        itemRef.current.classList.add('dragover');
    }

    const onDragLeave = e =>{
        itemRef.current.classList.remove('dragover');
    }

    const onDragOver = e =>{
        e.preventDefault();
    }

    const onDrop = e =>{
        itemRef.current.classList.remove('dragover');
        //console.log(e.target);
        props.onDrop(props.index)
    }
    return (
        <li className="draggable-list__item"
            ref={itemRef}
            draggable={true}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd = {onDragEnd}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {props.children}
        </li>
    )
}

DraggableListItem.propTypes = {
    index: PropTypes.number,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func
}

export default DraggableListItem
