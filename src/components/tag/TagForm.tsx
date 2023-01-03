import { defineComponent, onMounted, PropType, reactive, toRaw } from 'vue';
import { Button } from '../../shared/Button';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Form, FormItem } from '../../shared/Form';
import { hasError, Rules, validate } from '../../shared/validate';
import { useRoute, useRouter } from 'vue-router'
import { Dialog } from 'vant'
import s from './Tag.module.scss';
import { http } from '../../shared/Http';
import { onFormError } from '../../shared/onFormError';

export const TagForm = defineComponent({
  props: {
    id: Number,
    //是否显示删除按钮
    isShowDeBtn: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup: (props, context) => {
    const route = useRoute();
    const formData = reactive<Partial<Tag>>({
      id: undefined,
      name: '',
      sign: '',
      kind: route.query.kind!.toString()
    })
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
    const router = useRouter();
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
        { key: 'sign', type: 'required', message: '必填' },
      ]
      Object.assign(errors, {
        name: [],
        sign: []
      })
      Object.assign(errors, validate(formData, rules));
      if (!hasError(errors)) {
        const promise = await formData.id ?
          http.patch(`/tags/${formData.id}`, formData, {
            params: { _mock: 'tagEdit' },
          }) :
          http.post(`/tags`, formData, {
            params: { _mock: 'tagCreate' }
          })
        await promise.catch((error) =>
          onFormError(error, (data) => Object.assign(errors, data.errors))
        )
        router.back();
      }
    }
    onMounted(async () => {
      if (!props.id) { return }
      const response = await http.get<Resource<Tag>>(`/tags/${props.id}`, {
        _mock: `tagShow`
      });
      Object.assign(formData, response.data.resource);
    })
    const onDelete = async (options?: { withItems?: boolean }) => {
      await Dialog.confirm({
        title: '确认',
        message: '你真的要删除吗？',
      })

      router.back()
    }
    return () => (
      <Form onSubmit={onSubmit} >
        <FormItem label='标签名（最多 4 个字符）'
          type="text"
          v-model={formData.name}
          error={errors['name']?.[0]}
          class={s.tagTitle}
        />
        <FormItem label={'符号 ' + formData.sign}
          type="emojiSelect" v-model={formData.sign}
          error={errors['sign']?.[0]}
          class={s.tagSelect}
        />
        <FormItem>
          <p class={s.tips}>长按标签进行编辑</p>
        </FormItem>

        <FormItem class={s.buttondiv}>
          <Button type="submit" class={[s.button]}>确定</Button>
          <Button onClick={() => onDelete({ withItems: true })} class={[s.button, props.isShowDeBtn ? '' : s.hiddenBtn]}>删除标签</Button>
        </FormItem>
      </Form>
    )
  }
})