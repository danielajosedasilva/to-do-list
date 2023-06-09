import { Component, DoCheck } from '@angular/core';

//Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');
  constructor() { }
  ngDoCheck(): void {
    this.setLocalStorange()
  }
  public setEmitTaskList(event: string) {
    this.taskList.push({ task: event, checked: false })
  }

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1)
  }

  public deleteAllItemTaskList() {
    const confirm = window.confirm("Você realmente deseja realmente remover todas as tasks?")
    if (confirm == true) {
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm("Task vazia, deseja deletar?");
      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorange() {
    if (this.taskList) {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked))
      localStorage.setItem("list", JSON.stringify(this.taskList))
    }
  }

}
