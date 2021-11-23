import { Component } from "./core/component";
import {GetItem} from "./api";

export class Cart extends Component{
    async setup(){
        const storage = localStorage.getItem('products_cart');
        this.$state.cart = storage.map(async ({productId, optionId, quantity})=>{
            const json = await GetItem(productId);
            const option = json.productOptions.find(option=>option.id===optionId);
            return {name:json.name, optionName:option.name, price:(json.price+option.price), url:json.imageUrl, quantity }
        });
        this.render();
        this.setEvent();
        this.$el.hidden=false;
    }
    template() {
        const {cart} = this.$state;
        return `
           <h1>장바구니</h1>
        <div class="Cart">
            <ul>
        ${cart.map(({name, optionName, price, url, quantity}) => `
                <li class="Cart__item">
                    <img src=${url}>
                    <div class="Cart__itemDesription">
                        <div>${name} ${optionName} ${price.toLocaleString()} ${quantity}</div>
                        <div>${(price * quantity).toLocaleString()} </div>
                    </div>
                </li>원
        `)}
         </ul>
            <div class="Cart__totalPrice">
            총 상품가격 ${cart.reduce((acc, cur)=>{
                return acc+cur.price*cur.quantity
        }, 0)} 원
            </div>
        <button class="OrderButton">주문하기</button>
    </div>`
    }

    setEvent(){
        this.addEvent('click', 'button.OrderButton', (e)=>{
            alert('주문되었습니다.');
            localStorage.removeItem('products_cart');
            this.navigateTo('/web');
        })

    }
}