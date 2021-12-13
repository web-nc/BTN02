import React from "react";
import ListAssignment from "./ListAssignment";
import NewAssignment from "./NewAssignment";

import { updateAssignmentOrder, updateAssignment, createAssignment, deleteAssignment } from '../../../services/assignment';


function Assignment({ courseId, assignments, handleAssignmentsChange }) {

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.index === destination.index) return;

    const copiedItems = [...assignments];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    handleAssignmentsChange(copiedItems);

    const data = {
      courseId,
      sourceIndex: source.index + 1,
      destinationIndex: destination.index + 1
    }
    updateAssignmentOrder(data).catch(err => console.log(err));

  };

  const handleUpdateAssignment = (index, data) => {
    return new Promise((resolve,reject) => {
      updateAssignment(data).then(res => {
        const currentAssignment = { ...assignments[index] };
        currentAssignment.name = data.name;
        currentAssignment.weight = data.weight;
  
        const list1 = assignments.slice(0, index);
        const list2 = assignments.slice(index + 1);
        const newAssignment = list1.concat(currentAssignment).concat(list2);
        handleAssignmentsChange(newAssignment);
        resolve(true);
      }).catch(err => {
        console.log(err);
        resolve(false);
      });
    });
  };

  const handleDeleteAssignment = (index, data) => {
    return new Promise((resolve,reject) => {
      deleteAssignment(data).then(res => {
        console.log(res);
        if (res.data.message === "DELETE_SUCCESSFUL") {
          const list1 = assignments.slice(0, index);
          const list2 = assignments.slice(index + 1);
          const newAssignment = list1.concat(list2);
          handleAssignmentsChange(newAssignment);
          resolve(true);
        }
        else resolve(false);
      }).catch(err => {
        console.log(err);
        resolve(false);
      })
      
    });
  };

  const handleCreateNewAssignment = (data) => {
    return new Promise((resolve,reject) => {
      data.courseId = courseId;
      createAssignment(data).then(res => {
        const newAssignment = res.data.assignment;
        const newAssignmentList = [...assignments];
        newAssignmentList.push(newAssignment);
        handleAssignmentsChange(newAssignmentList);
        resolve(true);
      }).catch(err => {
        console.log(err);
        resolve(false);
      })
    });
    
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          marginTop: 30,
        }}
      >
        <ListAssignment
          onDragEnd={onDragEnd}
          assignment={assignments}
          handleUpdateAssignment={handleUpdateAssignment}
          handleDeleteAssignment={handleDeleteAssignment}
        />
        <NewAssignment handleCreateNewAssignment={handleCreateNewAssignment} />
      </div>
    </>
  );
}

export default Assignment;
