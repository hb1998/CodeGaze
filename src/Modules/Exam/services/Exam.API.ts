import { ExamInsertDto, ExamUpdateDto } from '../../../types/Models';
import { supabase } from '../../API/supabase';


export class ExamAPIService {

    static async getAll() {
        const { data, error } = await supabase.from('exam').select('*');
        if (error) {
            throw error;
        }
        return data || [];
    }

    static async getById(id: number) {
        const { data, error } = await supabase
            .from('exam')
            .select('*, challenge(*)')
            .eq('id', id)
            .single();
        if (error) {
            throw error;
        }
        return data || null;
    }

    static async create(exam: ExamInsertDto) {
        const { data, error } = await supabase.from('exam').insert(exam);
        if (error) {
            throw error;
        }
        return data?.[0];
    }

    static async update(exam: ExamUpdateDto) {
        const { data, error } = await supabase
            .from('exam')
            .update(exam)
            .eq('id', exam.id);
        if (error) {
            throw error;
        }
        return data?.[0];
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from('exam').delete().eq('id', id);
        if (error) {
            throw error;
        }
    }
}