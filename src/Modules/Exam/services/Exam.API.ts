import { ExamInsertDto, ExamUpdateDto } from '../../../types/Models';
import { supabase } from '../../API/supabase';

export class ExamAPIService {
    static async getAll() {
        const { data, error } = await supabase.from('exam').select('*,challenge(count)');
        if (error) {
            throw error;
        }
        return data || [];
    }

    static async getById(id: string) {
        const { data, error } = await supabase.from('exam').select('*, challenge(*)').eq('id', id).single();
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
        return data ? data[0] : null;
    }

    static async update(exam: ExamUpdateDto) {
        const { data, error } = await supabase.from('exam').update(exam).eq('id', exam.id);
        if (error) {
            throw error;
        }
        return data ? data[0] : null;
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from('exam').delete().eq('id', id);
        if (error) {
            throw error;
        }
    }
}
