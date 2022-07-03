import React, { useRef } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './drag-element.module.css';
import { DELETE_INGREDIENT, MOVE_CART_INGREDIENT } from '../../../services/actions/cart';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { TIngredientCart } from '../../../types';

export default function DragElement(props: {ingredient: TIngredientCart, index: number}) {

	const dispatch = useDispatch();	
	const ref = useRef<HTMLDivElement>(null);
	
	const handleDelete = () => {
		dispatch({
			type: DELETE_INGREDIENT,
			payload: props.ingredient
		})
	}

	const [{isDrag}, dragRef] = useDrag({
		type: "cartIngredient",
		item: {index: props.index},
		collect: monitor => ({
			isDrag: monitor.isDragging()
		})
	});

	const [{isOver}, dropRef] = useDrop({
		accept: "cartIngredient",
		collect: monitor => ({
			isOver: monitor.isOver()
		}),
		hover(ingredient: TIngredientCart, monitor) {
			const dragIndex = ingredient.index;
			const hoverIndex = props.index;
			if (dragIndex === hoverIndex) return;

			const draggableEl = ref.current;	
			if(draggableEl) {
				const hoverBoundingRect: DOMRect  = draggableEl.getBoundingClientRect();
				const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
				const clientOffset = monitor.getClientOffset();
				if (clientOffset) {
					const hoverActualY = clientOffset.y - hoverBoundingRect.top;
					// if dragging down, continue only when hover is smaller than middle Y
					if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
					// if dragging up, continue only when hover is bigger than middle Y
					if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
				}				
			}			

			dispatch({
				type: MOVE_CART_INGREDIENT,
				payload: { dragIndex, hoverIndex }
			});				
			
			ingredient.index = hoverIndex;
		}
	});

	dragRef(dropRef(ref));

	return (		
		<div 
			className = {styles.container} 
			ref={ref} 
			style={{
				border: isOver ? "1px dashed green" : '',
				opacity: isDrag ? 0.2 : 1
			}} >
				<div className = {styles.drag_icon}>			  
					<DragIcon type="primary"/>			  
				</div>          		
				<ConstructorElement			
					text = {props.ingredient.name}
					thumbnail = {props.ingredient.image_mobile}
					price = {props.ingredient.price}
					isLocked = {false}
					handleClose={() => handleDelete()} 				
				/>
		</div>
  	)
}
