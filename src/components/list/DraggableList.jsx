import React,{useState} from 'react'
import PropTypes from 'prop-types'
import DraggableListItem from './DraggableListItem'
import './draggable-list.css'
const DraggableList = props => {
    const [data, setData] = useState(props.data);

    const [dragStartIndex, setdragStartIndex] = useState([]);

    const onDragStart = (index) =>setdragStartIndex(index);

    const onDrop = (dropIndex) =>{
        const dataItem = data[dragStartIndex];
        console.log(dataItem);

        let list = [...data];
        list.splice(dragStartIndex, 1);

        if(dragStartIndex < dropIndex){

            setData([
                ...list.slice(0, dropIndex - 1),
                dataItem,
                ...list.slice(dropIndex - 1, list.length)
            ])

        }else{

            setData([
                ...list.slice(0, dropIndex ),
                dataItem,
                ...list.slice( dropIndex, list.length )
            ])
        }
    }
    return (
        <ul className="draggable-list">
            {
                data.map((item, index) => (
                    <DraggableListItem key={index}
                                       index={index}
                                       onDragStart={(index) => onDragStart(index)}
                                       onDrop={(index) => onDrop(index)}

                    
                    >
                        {props.renderItemContent(item)}
                    </DraggableListItem>
                ))
            }
            <DraggableListItem key={data.length}
                                index={data.length}
                                draggale={false}
                                onDrop={(index) => onDrop(index)}
                
            />
        </ul>
    )
}

DraggableList.propTypes = {
    data: PropTypes.array,
    renderItemContent: PropTypes.func
}

export default DraggableList
