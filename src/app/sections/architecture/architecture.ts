import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  signal,
} from '@angular/core';
import { Icon, IconName } from '../../shared/icons/icon';
import { Reveal } from '../../shared/reveal';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { AgentScene } from './agent-scene';

interface Agent {
  nameKey: string;
  icon: IconName;
}

@Component({
  selector: 'app-architecture',
  imports: [Icon, Reveal, TranslatePipe, AgentScene],
  templateUrl: './architecture.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Architecture implements AfterViewInit, OnDestroy {
  @ViewChild('canvasWrap') canvasWrap?: ElementRef<HTMLDivElement>;

  protected readonly near = signal(false);

  protected readonly internalAgents: Agent[] = [
    { nameKey: 'arch.agent.workflow', icon: 'workflow' },
    { nameKey: 'arch.agent.compliance', icon: 'shield-check' },
    { nameKey: 'arch.agent.analytics', icon: 'chart-column' },
    { nameKey: 'arch.agent.assistant', icon: 'bot' },
  ];
  protected readonly externalAgents: Agent[] = [
    { nameKey: 'arch.agent.coach', icon: 'heart-handshake' },
    { nameKey: 'arch.agent.rpm', icon: 'activity' },
    { nameKey: 'arch.agent.care', icon: 'calendar-clock' },
    { nameKey: 'arch.agent.genetic', icon: 'dna' },
  ];

  private io?: IntersectionObserver;

  ngAfterViewInit(): void {
    const el = this.canvasWrap?.nativeElement;
    if (!el || typeof IntersectionObserver === 'undefined') {
      this.near.set(true);
      return;
    }
    this.io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.near.set(true);
          this.io?.disconnect();
        }
      },
      { rootMargin: '900px' },
    );
    this.io.observe(el);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}