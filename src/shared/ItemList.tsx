import s from './ItemList.module.scss';
import { defineComponent, watch, onUpdated, PropType, reactive, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { Item } from './Item';
import { TagItem } from './TagItem';
import { useTags } from './useTags';
import { http } from './Http';
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
      required: true,
    },
    hasMore: {
      type: Boolean as PropType<boolean>,
      required: false
    },
    page: {
      type: Number as PropType<number>,
      required: false
    },
    fetchTags: {
      type: Function as PropType<() => void>,
      required: false
    },
    selected: Number,
  },
  emits: ['update:selected'],
  setup(props, context) {

    // const { tags, hasMore, page, fetchTags } = useTags((page) => {
    //   return http.get<Resources<Tag>>('/tags', {
    //     kind: props.kind,
    //     page: page + 1,
    //     _mock: 'tagIndex',
    //   });
    // });
    const ItemType = props.ItemType;
   
    //标签点击事件
    const onSelect = (tag: Tag) => {
      context.emit('update:selected', tag.id);
      console.log("点击触发");
      router.push(`/tags/${tag.id}/input?kind=${props.kind}`)
    };
    const timer = ref<number>()
    const currentTag = ref<HTMLDivElement>()

    const router = useRouter()
    //标签长按事件
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

    return () => {
      const Items = props.Items;
      const hasMore = props.hasMore;
      const fetchTags = props.fetchTags;
      switch (ItemType) {
        case "bill": {


          return <div class={s.wrapper}>
            {Items!.map((item, index) => {
              return (<Item tagIcon={item.tags![0].sign} tagName={item.tags![0].name} tagPrice={item.amount} tagTime={item.happen_at} class={s.item}></Item>)
            })}
            <div>
              {
                hasMore ?
                  <div class={[s.footer, s.loadMove]} onClick={fetchTags}  >加载更多</div> :
                  <div class={s.footer}>没有更多</div>
              }
            </div>
          </div>
        };
        case "tag": {
          console.log(Items!.length);
          return <div class={s.wrapper} onTouchmove={onTouchMove}>
 
            {Items!.map((item, index) => {
              return (<TagItem onClick={() => onSelect(item)} onTouchstart={(e) => onTouchStart(e, item)}
                onTouchend={onTouchEnd} tagIcon={item.sign} tagNumber={index + 1} tagName={item.name} class={s.item}></TagItem>)
            })}
            <div>
              {
                hasMore ?
                  <div class={[s.footer, s.loadMove]} onClick={fetchTags}  >加载更多</div> :
                  <div class={s.footer}>没有更多</div>
              }

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