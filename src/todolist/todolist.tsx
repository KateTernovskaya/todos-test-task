import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../App";
import {Button} from "../components/button";
import styled from "styled-components";


type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
}
export const Todolist = (props: PropsType) => {
    const {title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus} = props

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    //KeyboardEvent<HTMLInputElement>
    const addTaskOnKeyUpHandler = (event: any) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter)
    }

    const mapTasks = tasks.map((task: TaskType) => {
            const removeTaskHandler = () => {
                removeTask(task.id)
            }
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                const newStatusValue = e.currentTarget.checked
                changeTaskStatus(task.id, newStatusValue)
            }

            return (
                <Task key={task.id} className={task.isDone ? 'is-done' : ''}>
                    <CheckboxTask type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                    <span>{task.title}</span>
                    <Button onClick={removeTaskHandler} title={'x'}/>
                </Task>
            )
        })


    return (
        <TodolistStyled>
            <TodolistTitle>{title}</TodolistTitle>
            <Wrapper>
                <TodolistInput
                    className={error ? 'error' : ''}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                    placeholder="What needs to be done?"
                />
                <Button title={'+'} onClick={addTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </Wrapper>
            {tasks.length === 0 ? <p>Тасок нет</p> : <ul style={{'padding': 0}}>{mapTasks}</ul>}
            <Wrapper>
                <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}/>
            </Wrapper>
        </TodolistStyled>
    )
};

const TodolistStyled = styled.div`
  border: 2px solid rgb(59, 141, 161);
  padding: 20px;
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  border-radius: 10px;
`;

const TodolistTitle = styled.h3`
  font-size: 1.3em;
  text-align: center;
  letter-spacing: 2px;
`;

const TodolistInput = styled.input`
  border: 1px solid rgb(59, 141, 161);
  border-radius: 5px;
  padding: 5px 10px;
  width: 70%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Task = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 0;
  border-bottom: 1px solid rgb(59, 141, 161);
`;
const CheckboxTask = styled.input`
  accent-color: rgb(59, 141, 161);
  transform: scale(1.3);
  opacity: 0.9;

`;
