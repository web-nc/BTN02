import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AssignmentCard from "./AssignmentCard";

function ListAssignment({
  onDragEnd,
  assignment,
  handleUpdateAssignment,
  handleDeleteAssignment,
}) {
  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Droppable droppableId="assignment">
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? "lightblue" : "lightgray",
                padding: "4px 4px 0 4px",
                width: "50%",
              }}
            >
              {assignment.map((item, index) => {
                return (
                  <AssignmentCard
                    key={item._id}
                    item={item}
                    index={index}
                    handleUpdateAssignment={handleUpdateAssignment}
                    handleDeleteAssignment={handleDeleteAssignment}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

export default ListAssignment;
