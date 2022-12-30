import s from './ItemList.module.scss';
import { defineComponent, onUpdated, PropType, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { Item } from './Item';
import { TagItem } from './TagItem';
export const ItemList = defineComponent({
  props: {
    Items: {
      type: Array as PropType<Array<any>>,
      required: false
    },
    ItemType: {
      type: String as PropType<'bill' | 'tag'>,
      required: true
    },
    kind: {
      type: String as PropType<string>,
      required: false,
    },
    selected: Number,
  },
  emits: ['update:selected'],
  setup(props, context) {
    return () => {
      const Items = props.Items;
      const ItemType = props.ItemType;
      const onSelect = (tag: Tag) => {
        context.emit('update:selected', tag.id);
        console.log("触发");
        router.push(`/tags/${tag.id}/input?kind=${props.kind}?tagname=${tag.name}?tagicon=${tag.sign}&return_to=${router.currentRoute.value.fullPath}`)
      };
      const timer = ref<number>()
      const currentTag = ref<HTMLDivElement>()

      const router = useRouter()
      const onLongPress = (tagId: Tag['id']) => {
         console.log("长按触发");
         router.push(`/tags/${tagId}/edit?kind=${props.kind}&return_to=${router.currentRoute.value.fullPath}`)
      }
      const onTouchStart = (e: TouchEvent, tag: Tag) => {
        currentTag.value = e.currentTarget as HTMLDivElement
        timer.value = setTimeout(() => {
          onLongPress(tag.id)
        }, 500)
      }
      const onTouchEnd = (e: TouchEvent) => {
        clearTimeout(timer.value)
      }
      const onTouchMove = (e: TouchEvent) => {
        const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
        if (currentTag.value !== pointedElement &&
          currentTag.value?.contains(pointedElement) === false) {
          clearTimeout(timer.value)
        }
      }
      switch (ItemType) {
        case "bill": {
          return <div class={s.wrapper}>
            {Items?.map((item, index) => {
              return (<Item tagIcon='\u{1F471}' tagName='旅行' tagPrice={1234} tagTime={"2000-01-01 12:39"} class={s.item}></Item>)
            })}
            <div class={s.footer}>没有更多</div>
          </div>
        };
        case "tag": {
          return <div class={s.wrapper}>
            {Items?.map((item, index) => {
              return (<TagItem onClick={() => onSelect(item)}   onTouchstart={(e)=>onTouchStart(e, item)}
              onTouchend={onTouchEnd} tagIcon={item.sign} tagNumber={index + 1} tagName={item.name} class={s.item}></TagItem>)
            })}
            <div>
              
              <div class={s.footer}>没有更多</div>
            </div>
      
          </div>
        };
        case undefined: {
          return <div class={s.wrapper}>请输入有效参数</div>
        }
      }
    }
  }
})