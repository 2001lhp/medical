import { getPrescriptionPic } from '@/services/home'
import { showImagePreview } from 'vant'
export default function useShowPrescription() {
    const prescription = async (id: string | number) => {
        const res = await getPrescriptionPic(id)
        if (res.data.id) {
            showImagePreview([res.data.url])
        }
    }
    return {
        prescription
    }
}