export class Time {
    date: Date;
    constructor(date?: string | Date) {
        if (date === undefined) {
            this.date = new Date();
        } else if (typeof date === 'string') {
            this.date = new Date(date);
        }else{
            this.date=date;
        }
    }
    format(pattern = 'YYYY-MM-DD') {
        const year = this.date.getFullYear();
        const month = this.date.getMonth() + 1;
        const day = this.date.getDate();
        const hour = this.date.getHours();
        const minute = this.date.getMinutes();
        const second = this.date.getSeconds();
        const msecond = this.date.getMilliseconds();
        return pattern.replace(/YYYY/g, year.toString())
            .replace(/MM/, month.toString().padStart(2, '0'))
            .replace(/DD/, day.toString().padStart(2, '0'))
            .replace(/HH/, hour.toString().padStart(2, '0'))
            .replace(/mm/, minute.toString().padStart(2, '0'))
            .replace(/ss/, second.toString().padStart(2, '0'))
            .replace(/SSS/, msecond.toString().padStart(3, '0'))
    }
    //月初第一天
    firstDayOfMonth() {
        return new Time(new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0));
    }
    //年初第一天
    firstDayOfYear() {
        return new Time(new Date(this.date.getFullYear(), 0, 1, 0, 0, 0));
    }
    //月底最后一天
    lastDayOfMonth() {
        //下个月的第0天即为上个月的最后一天
        return new Time(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0, 0));
    }
    //年底最后一天
    lastDayOfYear() {
        //同理，下一年的第0月，第0天即为上一年的最后一天
        return new Time(new Date(this.date.getFullYear() + 1, 0, 0, 0, 0, 0));
    }
    getRaw() {
        return this.date;
    }
    add(amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond') {
        let date = new Date(this.date.getTime());
        switch (unit) {
            case 'year':
                date.setFullYear(date.getFullYear() + amount);
                break;
            case 'month': //考虑到有每个月天数都有所不同(有的是30天，有的是31天，或者是29天)，所以必须先算出月末最后一天，然后进行比较
                const d = date.getDate();
                date.setDate(1);
                date.setMonth(date.getMonth() + amount);
                const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0).getDate();
                date.setDate(Math.min(d, d2));
                break;
            case 'day':
                date.setDate(date.getDate() + amount);
                break;
            case 'hour':
                date.setHours(date.getHours() + amount);
                break;
            case 'minute':
                date.setMinutes(date.getMinutes() + amount);
                break;
            case 'second':
                date.setSeconds(date.getSeconds() + amount);
                break;
            case 'millisecond':
                date.setMilliseconds(date.getMilliseconds() + amount);
                break;
            default:
                throw new Error('Time.add: unknown unit');

        }
        return new Time(date);
    }

}