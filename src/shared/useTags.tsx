import { AxiosResponse } from "axios"
import { computed, onMounted, ref } from "vue"
import { http } from "./Http"

type Fetcher=(page:number)=>Promise<AxiosResponse<Resources<Tag>>>;
export const useTags=(fetcher:Fetcher)=>{
    const page=ref(0);
    const hasMove=ref(false);
    const tags=ref<Tag[]>([]);
    const fetchTags=async()=>{
        const response=await fetcher(page.value);
        const {resources,pager}=response.data;
        tags.value.push(...resources);
        hasMove.value=(pager.page-1)*pager.per_page+resources.length<pager.count;
        page.value+=1;
    }
    onMounted(fetchTags);
    return {page,hasMove,tags,fetchTags};
}