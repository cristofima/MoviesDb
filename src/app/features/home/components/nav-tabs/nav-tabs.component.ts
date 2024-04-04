import { MinimalMedia } from '@/core/models/base-media.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrl: './nav-tabs.component.scss'
})
export class NavTabsComponent implements OnInit {

  @Input({ required: true }) private tabsActions: {
    buttonName: string,
    callback: Function
  }[] = [];

  tabsContent: {
    buttonName: string,
    mediaList: MinimalMedia[]
  }[] = [];

  activeTab = 1;

  ngOnInit(): void {
    this.tabsContent = [];
    this.loadMediaAsync();
  }

  private async loadMediaAsync() {
    this.tabsContent = [];
    for (let i = 0; i < this.tabsActions.length; i++) {
      let mediaList = await this.tabsActions[i].callback();
      this.tabsContent.push({
        buttonName: this.tabsActions[i].buttonName,
        mediaList: mediaList
      });
    }
  }
}
