

const burger = document.querySelector('.header__burger');
 const list = document.querySelector('.header__list');

     list.classList.add('burger__show');  
     burger.onclick = function() {
         list.classList.toggle('burger__show');
     }





const btn = document.querySelector('.btn');
const dropContent = document.querySelector('.drop_content');


dropContent.classList.add('act');

btn.onclick = function() {
    
    dropContent.classList.toggle('act');
}        






class SLIDER {
    constructor(options) {
        this.slider = document.querySelector(options.slider)
        this.sliderLine = this.slider.querySelector('.slider__line')
        this.children = this.sliderLine.children
        this.prev = this.slider.querySelector('.slider__prev')
        this.next = this.slider.querySelector('.slider__next')

        this.dir = options.direction.toUpperCase() === 'X' ? 'X' : 'Y';
        this.timeMove = options.time != undefined ? options.time : 500;
        this.width = options.width;
        this.height = options.height;

        this.moveSize = 'Y' === this.dir ? this.height : this.width;
        this.interval = typeof options.interval === 'number' ? options.interval : options.time + 500;


        this.sliderLine.style = `
            position: relative;
            height: ${this.height}px;
            overflow: hidden;
        `;

        this.activeSlide = 0;

        for(let i = 0; i < this.children.length; i++) {
            this.children[i].style = `
                position: absolute;
                width: ${this.width}px;
                height: ${this.height}px;
            `; 

            if(i != this.activeSlide) {
                this.children[i].style.transform = `translate${this.dir}(${this.moveSize}px)`;
            }
            if(i === this.children.length - 1) {
                this.children[i].style.transform = `translate${this.dir}(-${this.moveSize}px)`;
            }
        }

        this.next.addEventListener('click', ()=> this.move(this.next))
        this.prev.addEventListener('click', () => this.move(this.prev))
        
        if(options.autoplay) {

            let interval = setInterval(() => {
                this.move(this.next)
            }, this.interval)

            this.slider.addEventListener('mouseenter', () => {
                clearInterval(interval)
            })
            this.slider.addEventListener('mouseleave', () => {
                interval = setInterval(() => {
                    this.move(this.next)
                }, this.interval)
            })
        }
    }
    move(btn) {
        this.next.disabled = true
        this.prev.disabled = true

        setTimeout(() => {
            this.next.disabled = false;
            this.prev.disabled = false
        }, this.timeMove)                          


        let leftOrRight = btn === this.next ? this.moveSize * -1 : this.moveSize;

        for(let i = 0; i < this.children.length; i++) {
            this.children[i].style.transition = '0ms';
            if(i != this.activeSlide) {
                this.children[i].style.transform = `translate${this.dir}(${leftOrRight * -1}px)`;
            }
        }

        this.children[this.activeSlide].style.transform = `translate${this.dir}(${leftOrRight}px)`;
        this.children[this.activeSlide].style.transition = this.timeMove + 'ms';

        if(btn === this.next) {
            this.activeSlide++
            if(this.activeSlide === this.children.length) {
                this.activeSlide = 0
            }
        }else if(btn === this.prev) {
            this.activeSlide--
            if(this.activeSlide < 0) {
                this.activeSlide = this.children.length - 1
            }
        }

        this.children[this.activeSlide].style.transform = `translate${this.dir}(0px)`;
        this.children[this.activeSlide].style.transition = this.timeMove + 'ms';

    }
}

const slider = new SLIDER({
    slider: '.first-slider',
    direction: 'x',
    time: 1000,
    autoplay: true,
    interval: 4000,
    height: 600,
    width: 1400
})

const slideLast = new SLIDER({
    slider: '.last-slider',
    direction: 'y',
    time: 5000
})


