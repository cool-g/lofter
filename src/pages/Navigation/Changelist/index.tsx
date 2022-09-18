import React, { memo } from 'react'
import { FindTabsType } from '@/models/index'
import { DndContext, TouchSensor, MouseSensor, useSensor,useSensors, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy,useSortable } from '@dnd-kit/sortable'
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'

interface ChangeListProps {
    list:FindTabsType[];
    doChanged:(data:FindTabsType[])=>void;
}
// 拖放组件
const ChangeList:React.FC<ChangeListProps> =(props) => {
    const { list } = props
    const { doChanged } = props
    // 初始化触摸传感器
    const touchSensor = useSensor(TouchSensor,{
        // 按下保持300毫秒启动拖动，拖动公差为10px
        activationConstraint:{
            delay: 300,
            tolerance: 10,
        }
    })
    // 初始化鼠标传感器
    const mouseSensor = useSensor(MouseSensor,{
        // 按下保持300毫秒启动拖动，拖动公差为10px
        activationConstraint:{
            delay: 300,
            tolerance: 0,
        }
    })
    // 使用mouse和touch传感器
    const sensors = useSensors(
        touchSensor,
        mouseSensor
    )

    const handleDragEnd = ({active, over}:{active:any,over:any}) => {
        // active 当前拖拽元素及其data
        // over 碰撞元素data
        if(active.id !== over.id){
            const oldIndex = list.findIndex((item:any) => item.id === active.id)
            const newIndex = list.findIndex((item:any) => item.id === over.id)
            // 拖动位置后，使用arrayMove 将数组之间位置调换
            const newtabs =  arrayMove(list, oldIndex, newIndex)
            // 向父组件报告
            doChanged(newtabs)
        }
    }

    const tabElement = list.map(
        // 推荐tab不可自定义顺序
        item => item.id!==0?<ListItem {...item} key={item.id} />:null
        // item => <ListItem {...item} key={item.id} />
    )

    return (
        <div>
            <DndContext
                // 传感器配置
                sensors={sensors}
                // 碰撞算法
                collisionDetection={closestCenter}
                // 拖拽结束事件
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            >
                <SortableContext
                    items={list.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tabElement}
                </SortableContext>
            </DndContext>
        </div>
    )
}

// 子组件
interface ListItemProps {
    id:number,
    name:string
}
const ListItem:React.FC<ListItemProps> = (props) => {
    const { id,name } = props

    const {
        setNodeRef,
        attributes,
        listeners,
        transition,
        transform,
        isDragging
    } = useSortable({id: id})

    const style = {
        transition,
        height:'38px',
        fontSize:'18px',
        transform: CSS.Transform.toString(transform),
        borderBottom:'1px solid #f8f4f4',
        display:'flex',
        justifyContent:'space-between',
        alignItem:'center',
        margin: '15px 20px 0 20px',
        opacity: isDragging ? 0.5 : 1,
    }
    return (
        <div 
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
        >
            <span>{name}</span> 
            <i style={{color:'#d3d1d1'}} className='fa fa-bars'/> 
        </div>
    )
}

export default memo(ChangeList)
