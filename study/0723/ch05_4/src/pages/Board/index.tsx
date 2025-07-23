import {useMemo} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import {Title} from '../../components'
import CreateListForm from './CreateListForm'
import {useLists} from '../../store/useLists'
import BoardList from '../BoardList'

// todo
export default function Board() {
  const {lists, onCreateList, onRemoveList, onMoveList, onDragEnd} = useLists()

  const children = useMemo(
    () =>
      lists.map((list, index) => {
        console.log(lists)

        return (
          <BoardList
            key={list.uuid}
            list={list}
            onRemoveList={onRemoveList(list.uuid)}
            index={index}
            onMoveList={onMoveList}
          />
        )
      }),
    [lists, onRemoveList, onMoveList]
  )

  return (
    <section className="mt-4">
      <Title>Board</Title>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-wrap p-2 mt-4">
          {children}
          <CreateListForm onCreateList={onCreateList} />
        </div>
      </DragDropContext>
    </section>
  )
}
