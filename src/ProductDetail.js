import { Component } from "./core/component";
import {GetItem} from "./api";


export class ProductDetail extends Component{
    async setup(){
        const {productId} = this.$props;
        this.$state= {
            detail: await GetItem(productId),
            selectedOptions:[],
        }
        this.render()
        this.setEvent();
        this.$el.hidden=false;
    }
    template(){
        const {id, name, price, imageUrl, productOptions} = this.$state.detail;

        return `
       <h1>${name} 상품 정보</h1>
       <div class="ProductDetail">
         <img src=${imageUrl}>
         <div class="ProductDetail__info">
           <h2>${name}</h2>
           <div class="ProductDetail__price">${price}~</div>
           <select>
             <option>선택하세요.</option>
             ${productOptions.map(option=>{
            if (option.stock===0){return `<option id=${option.id} disabled>(품절) ${name} ${option.name}</option> `}
            else if(option.price===0){
                return `<option id=${option.id}>${name} ${option.name}</option> `;}
            else return `<option id=${option.id}> ${name} ${option.name} (+${option.price.toLocaleString()})</option>`;
        })}
           </select>
           <div class="ProductDetail__selectedOptions">
             <h3>선택된 상품</h3>
             <ul>
             ${this.$state.selectedOptions.map(option=>
            `<li data-id=${option.id}>
                  ${name} ${option.name} ${(price+option.price).toLocaleString()} 원 <div><input type="number" value=${option.curAmount}>개</div>
              </li>
                ` )}
             </ul>
             <div class="ProductDetail__totalPrice">${selectedOptions.reduce((acc,cur)=>{
            return acc+cur.price*cur.curAmount;
        }, detail.price).toLocaleString()} </div>
             <button class="OrderButton">주문하기</button>
           </div>
         </div>
       </div>
       `

    }

    setEvent(){
        const {selectedOptions, detail, price} = this.$state;
        this.addEvent("change", "select", (e)=>{
            const exists =selectedOptions?.findIndex(option=>option.id === e.target.options[e.target.selectedInex].id)
            if(exists){
                return;
            }
            const option = detail.productOptions.find(option=>option.id===e.target.options[e.target.selectedInex].id);
            const newOption = { ...option, curAmount:1 }
            this.setState({selectedOptions: [...selectedOptions, newOption ]});
        });
        this.addEvent('change', 'input', (e)=>{
            const Id = e.target.closest('li').dataset.id;
            const option = selectedOptions.find(option=>option.id===Id);
            if(e.target.value > option.stock) return;
            option.curAmount = e.target.value;
            this.setState({...this.$state})
        });

        this.addEvent("click", "button.OrderButton", (e)=>{
            const selected = [...this.$el.querySelectorAll("li")];
            const storage = selectedOptions.map(option=>({
                productId: detail.id,
                optionId: option.id,
                quantity: option.curAmount
            }));
            localStorage['products_cart']= [...localStorage.getItem('products_cart'), ...storage];
            if(localStorage.getItem('products_cart')){
                this.navigateTo("/web/cart");
            }
            else{
                alert('장바구니가 비어있습니다.');
            }
        })
    }
}