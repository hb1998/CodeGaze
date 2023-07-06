import { CandidateInsertDto, CandidateUpdateDto } from '../../../types/Models';
import { supabase } from '../../API/supabase';


export class CandidateAPIService {

    static async getAll() {
        const { data, error } = await supabase.from('candidate').select('*, assessment(*)');
        if (error) {    
            throw error;
        }
        return data || [];
    }

    static async getById(id: number) {
        const { data, error } = await supabase
            .from('candidate')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            throw error;
        }
        return data || null;
    }

    static async create(candidate: CandidateInsertDto) {
        const { data, error } = await supabase.from('candidate').insert(candidate);
        if (error) {
            throw error;
        }
        return data?.[0];
    }

    static async update(candidate: CandidateUpdateDto) {
        const { data, error } = await supabase
            .from('candidate')
            .update(candidate)
            .eq('id', candidate.id);
        if (error) {
            throw error;
        }
        return data?.[0];
    }

    static async delete(id: number): Promise<void> {
        const { error } = await supabase.from('candidate').delete().eq('id', id);
        if (error) {
            throw error;
        }
    }
}