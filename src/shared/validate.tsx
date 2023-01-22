// 表单验证器

// 表单数据类型
interface FData {
    [k: string]: JSONValue
}
// 校验规则类型
type Rule<T> = {
    key: keyof T
    message: string
} & (
        { type: 'required' } |
        //regex传入的正则表达式
        { type: 'pattern', regex: RegExp } |
        { type: 'notEqual', value: JSONValue }
    )
type Rules<T> = Rule<T>[];
export type { Rules, Rule, FData };
// T 表示泛型，用来代指 FData，将 FData 与 Rule 的 key 关联起来
// 比如 FData 的 key 有 name 和 sign，那么 Rule 的 key 只能在里面选，而不能无故多出一个 age
export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
    type Errors = {
        [k in keyof T]?: string[]
    }
    const errors: Errors = {};
    rules.map(rule => {
        const { key, type, message } = rule;
        const value = formData[key];
        switch (type) {
            case 'required':
                if (isEmpty(value)) {
                    // 将错误信息 errors 初始化为数组（使用 JS 双问号语法）
                    errors[key] = errors[key] ?? [];
                    errors[key]?.push(message);
                }
                break;
            case 'pattern':
                if (!isEmpty(value) && !rule.regex.test(value!.toString())) {
                    errors[key] = errors[key] ?? [];
                    errors[key]?.push(message);
                }
                break;
            case 'notEqual':
                if (!isEmpty(value) && value === rule.value) {
                    errors[key] = errors[key] ?? []
                    errors[key]?.push(message)
                }
                break;
            default:
                return


        }
    })
    return errors;
}
function isEmpty(value: null | undefined | string | number | FData) {
    return value === null || value === undefined || value === ''
}
export function hasError(errors: Record<string, string[]>) {
    let result = false;
    for (let key in errors) {
        if (errors[key].length > 0) {
            result = true;
            break;
        }
    }
    return result;
}