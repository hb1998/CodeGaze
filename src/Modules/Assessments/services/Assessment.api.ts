import { AssessmentInsertDto, AssessmentUpdateDto } from '../../../types/Models';
import { supabase } from '../../API/supabase';


export class AssessmentAPIService {

    static async getAll() {
        const { data, error } = await supabase.from('assessment').select('*');
        if (error) {
            throw error;
        }
        return data || [];
    }

    static async getById(id: number) {
        const { data, error } = await supabase
            .from('assessment')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            throw error;
        }
        return data || null;
    }

    static async create(assessment: AssessmentInsertDto) {
        const { data, error } = await supabase.from('assessment').insert(assessment);
        if (error) {
            throw error;
        }
        return data?.[0];
    }

    static async update(assessment: AssessmentUpdateDto) {
        const { data, error } = await supabase
            .from('assessment')
            .update(assessment)
            .eq('id', assessment.id);
        if (error) {
            throw error;
        }
        return data?.[0];
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from('assessment').delete().eq('id', id);
        if (error) {
            throw error;
        }
    }
}