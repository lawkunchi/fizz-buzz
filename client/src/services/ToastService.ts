import { createVNode, render } from 'vue';
import Toast from '../components/Toast.vue';

type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

class ToastService {
  private container: HTMLElement | null = null;

  constructor() {
    this.createToastContainer();
  }

  private createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.style.position = 'absolute';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    this.container = container;
  }

  showToast(message: string, type: string = 'success', duration: number = 3000, position: ToastPosition = 'top-right') {
    if (!this.container) return;

    this.applyPositionStyles(position); 

    const toastVNode = createVNode(Toast, { message, type, duration });
    const div = document.createElement('div');
    this.container.appendChild(div);
    render(toastVNode, div);

    setTimeout(() => {
      render(null, div);
      this.container?.removeChild(div);
    }, duration + 500); 
  }

  private applyPositionStyles(position: ToastPosition) {
    if (!this.container) return;

    switch (position) {
      case 'top-left':
        this.container.style.top = '10px';
        this.container.style.left = '10px';
        this.container.style.right = '';
        this.container.style.bottom = '';
        break;
      case 'top-right':
        this.container.style.top = '10px';
        this.container.style.right = '10px';
        this.container.style.left = '';
        this.container.style.bottom = '';
        break;
      case 'bottom-left':
        this.container.style.bottom = '10px';
        this.container.style.left = '10px';
        this.container.style.top = '';
        this.container.style.right = '';
        break;
      case 'bottom-right':
        this.container.style.bottom = '10px';
        this.container.style.right = '10px';
        this.container.style.top = '';
        this.container.style.left = '';
        break;
    }
  }
}

export const toastService = new ToastService();