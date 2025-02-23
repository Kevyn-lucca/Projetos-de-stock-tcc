<template>
  <nav class="backgroundhead">
    <div class="flex p-4 place-content-between items-center h-20">
      <div class="flex place-content-between w-2/5">
        <div>
          <img src="assets/bread-svgrepo-com(4).svg" alt="Logo" class="w-20 h-20" />
        </div>
        <div id="headerMain" class="flex-1 mt-4">
          <ul v-if="false" class="flex gap-6 justify-center items-center relative">
            <li>
              <button class="buttonClassico"><a href="#">Sobre</a></button>
            </li>
            <li>
              <button class="buttonClassico"><a href="#">Cadastro</a></button>
            </li>
          </ul>
          <ul v-else></ul>
        </div>
      </div>

      <div v-if="false" class="flex w-20 items-center gap-2">
        <a aria-label="Log-out" href="#">
          <svg class="w-8 h-8 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="#d98b4d"
              d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
            />
          </svg>
        </a>
      </div>
      <div v-else>
        <button class="buttonClassico"><a href="#">Login</a></button>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.backgroundhead {
  background-color: $HeaderBgMain;
  color: $ConteudoTheme;
}

.buttonClassico {
  --bg: #f4e1c1;
  --hover-bg: #d98b4d;
  --hover-text: #f4e1c1;
  color: #4e2a1d;
  cursor: pointer;
  border: 1px solid var(--bg);
  border-radius: 8px;
  padding: 0.6em 1.5em;
  background: var(--bg);
  transition: 0.3s ease;
  font-weight: bold;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}

.buttonClassico:hover {
  color: var(--hover-text);
  transform: translate(-0.25rem, -0.25rem);
  background: var(--hover-bg);
  box-shadow: 0.25rem 0.25rem var(--bg), 0 0 10px rgba(0, 0, 0, 0.2);
}

.buttonClassico:active {
  transform: translate(0);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>

<!-- <script lang="ts" setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';

// Definição da classe HoverButton
class HoverButton {
  private el: HTMLElement;
  private hover: boolean;
  private x: number = 0;
  private y: number = 0;
  private width: number = 0;
  private height: number = 0;

  constructor(el: HTMLElement) {
    this.el = el;
    this.hover = false;
    this.calculatePosition();
    this.attachEventsListener();
  }

  // Adiciona os ouvintes de eventos
  private attachEventsListener(): void {
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('resize', () => this.calculatePosition());
  }

  // Calcula as posições iniciais do botão para manipular a animação de hover
  private calculatePosition(): void {
    gsap.set(this.el, {
      x: 0,
      y: 0,
      scale: 1,
    });
    const box = this.el.getBoundingClientRect();
    this.x = box.left + box.width * 0.5;
    this.y = box.top + box.height * 0.5;
    this.width = box.width;
    this.height = box.height;
  }

  // Manipula o movimento do mouse e ativa ou desativa o hover
  private onMouseMove(e: MouseEvent): void {
    let hover = false;
    const hoverArea = this.hover ? 0.7 : 0.5;
    const x = e.clientX - this.x;
    const y = e.clientY - this.y;
    const distance = Math.sqrt(x * x + y * y);

    if (distance < this.width * hoverArea) {
      hover = true;
      if (!this.hover) {
        this.hover = true;
      }
      this.onHover(e.clientX, e.clientY);
    }

    if (!hover && this.hover) {
      this.onLeave();
      this.hover = false;
    }
  }

  // Ação quando o mouse está sobre o botão
  private onHover(x: number, y: number): void {
    gsap.to(this.el, {
      x: (x - this.x) * 0.5,
      y: (y - this.y) * 0.5,
      scale: 1.15,
      ease: 'power2.out',
      duration: 0.1,
    });
    this.el.style.zIndex = '10';
  }

  // Ação quando o mouse sai do botão
  private onLeave(): void {
    gsap.to(this.el, {
      x: 0,
      y: 0,
      scale: 1,
      ease: 'elastic.out(1.2, 0.4)',
      duration: 0.7,
    });
    this.el.style.zIndex = '1';
  }
}

// Inicializa os botões depois que o componente é montado
onMounted(() => {
  const buttons = document.querySelectorAll('.hover-btn');
  buttons.forEach((btn) => new HoverButton(btn as HTMLElement));
});
</script> -->
