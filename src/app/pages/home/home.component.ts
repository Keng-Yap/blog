import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
public items: any[] = [
    { time: '8 hours ago', title: 'Auto model selection is generally available in…' },
    { time: '10 hours ago', title: 'GitHub Spark: Improvements, DPA…' },
    { time: '11 hours ago', title: 'GitHub Enterprise Server 3.19 is now generally…' },
    { time: '16 hours ago', title: 'The GitHub MCP Server adds support for tool…' },
    { time: '16 hours ago', title: 'The GitHub MCP Server adds support for tool…' },
    { time: '16 hours ago', title: 'The GitHub MCP Server adds support for tool…' },
    { time: '16 hours ago', title: 'The GitHub MCP Server adds support for tool…' }
  ];
}
