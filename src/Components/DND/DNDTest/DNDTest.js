import React, { Component } from 'react';

export default class AppDragDropDemo extends Component {
    state = {
        tasks: [
            {name:"First"},
            {name:"Second"},
            {name:"Third"}
          ]
    }

    onDragStart = (e, index) => {
        e.dataTransfer.setData("id", index);
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDrop = (e, index) => {
       let id = e.dataTransfer.getData("id");
       console.log(id, index)

    //    let tasks = this.state.tasks.filter((task) => {
    //        if (task.id == index){

    // //        }
    // function array_move(arr, old_index, new_index) 
        const arr = this.state.tasks;
        if (index >= arr.length) {
            var k = index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(index, 0, arr.splice(id, 1)[0]);
        //return arr; // for testing
        this.setState({tasks: arr});
    
       
       
    //    let tasks = this.state.tasks.filter((task) => {
    //        if (task.category == 'wip') {
    //            task.category = 'complete';
    //        }
    //        return task;
    //    });

    //    this.setState({
    //        ...this.state,
    //        tasks
    //    });
    //    console.log(this.state)
    }

    render() {
        // var tasks = {
        //     wip: [],
        //     complete: [],
        // }

        // this.state.tasks.forEach ((t, index) => {
        //     tasks[t.category].push(
        //         <div key={index}
        //             onDragStart = {(e) => this.onDragStart(e, index)}
        //             draggable
        //             className="draggable"
        //             style = {{backgroundColor: t.bgcolor}}
        //         >
        //             {t.name}
        //         </div>
        //     );
        // });

        return (
            <div className="container-drag">
            {this.state.tasks.map((task, index) => (
                <div style={{background: '#aaaaaa', border: '2px solid black', margin: '5px', height: '50px'}}>
                <div onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, index)}} style={{background: 'red', height: '10px'}}></div>
                <div draggable='true' onDragStart = {(e) => this.onDragStart(e, index) } style={{background: 'lightblue'}}>Move</div>
                {task.name}
                </div>
            ))}
                {/* <h2 className="header">DRAG & DROP DEMO</h2> */}
                {/* {tasks.wip} */}
                {/* <div className="wip"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "0")}}>
                    <span className="task-header">WIP</span>
                    {tasks.complete[0]}
                </div> */}
                {/* <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "1")}>
                     <span className="task-header">COMPLETED</span>
                     {tasks.complete[1]}
                     {tasks.complete}
                </div> */}
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