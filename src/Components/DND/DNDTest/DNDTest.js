import React, { Component } from 'react';

export default class AppDragDropDemo extends Component {
    state = {
        tasks: [
            {name:"Learn Angular",category:"wip", bgcolor: "yellow"},
            {name:"React", category:"wip", bgcolor:"pink"},
            {name:"Vue", category:"wip", bgcolor:"skyblue"}
          ]
    }

    onDragStart = (ev, index) => {
        ev.dataTransfer.setData("id", index);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let tasks = this.state.tasks.filter((task) => {
           if (task.category == 'wip') {
               task.category = 'complete';
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
       console.log(this.state)
    }

    render() {
        var tasks = {
            wip: [],
            complete: [],
        }

        this.state.tasks.forEach ((t, index) => {
            tasks[t.category].push(
                <div key={index}
                    onDragStart = {(e) => this.onDragStart(e, index)}
                    draggable
                    className="draggable"
                    style = {{backgroundColor: t.bgcolor}}
                >
                    {t.name}
                </div>
            );
        });

        return (
            <div className="container-drag">
                <h2 className="header">DRAG & DROP DEMO</h2>
                {tasks.wip}
                <div className="wip"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "0")}}>
                    <span className="task-header">WIP</span>
                    {tasks.complete[0]}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "1")}>
                     <span className="task-header">COMPLETED</span>
                     {tasks.complete[1]}
                     {/* {tasks.complete} */}
                </div>
                {/* <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "2")}>
                     <span className="task-header">COMPLETED</span>
                     {tasks.complete}
                </div> */}



            </div>
        );
    }
}