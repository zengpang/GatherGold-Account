import { Dialog } from 'vant';
import { defineComponent, reactive, resolveComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button';
import { http } from '../../shared/Http';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
import { TagForm } from './TagForm';
export const TagEdit=defineComponent({
    setup:(props,context)=>{
         const route=useRoute();
        //获取Tagid
        const numberId=parseInt(route.params.id!.toString());
        //判断Tagid是否为空，如果为空则判断id不存在
        if(Number.isNaN(numberId))
        {
          return ()=><div>id 不存在</div>
        }
      
        return () => (
            <MainLayout iconShow={true}>{{
              title: () => '标签修改',
              
              default: () => <>
                <TagForm id={numberId} class={s.tagForm} isShowDeBtn={true}/>
              </>
            }}</MainLayout>
          )
    }
})