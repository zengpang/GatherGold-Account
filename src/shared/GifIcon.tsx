import { defineComponent,ref } from "vue";

import { useLoad,LoadTypes } from "../hooks/useLoad";
export const GifIcon=defineComponent({
    props:{
       gifJson:{
          type:Object
       }

    },
    setup:(props,context)=>{
        const icon=ref<HTMLElement>();
        useLoad(icon,LoadTypes.loadGif,props.gifJson);
        return ()=>(
           <div ref={icon}>
            
           </div>
        )
    }
})