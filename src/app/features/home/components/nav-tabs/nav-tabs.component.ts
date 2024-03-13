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
    this.tabsActions.forEach(async(tab) => {
      this.tabsContent.push({
        buttonName: tab.buttonName,
        mediaList: await tab.callback()
      });
    });
  }
}
