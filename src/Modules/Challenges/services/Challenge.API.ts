import { ChallengeInsertDto, ChallengeUpdateDto } from '../../../types/Models';
import { supabase } from '../../API/supabase';

export class ChallengeAPIService {
    static async getAll() {
        const { data, error } = await supabase.from('challenge').select('*, exam_challenge(*,exam(*,assessment(*)))').order('created_at', { ascending: false });
        if (error) {
            throw error;
        }
        return data || [];
    }

    static async getById(id: string) {
        const { data, error } = await supabase.from('challenge').select('*').eq('id', id).single();
        if (error) {
            throw error;
        }
        return data || null;
    }

    static async create(challenge: ChallengeInsertDto) {
        const { data, error } = await supabase.from('challenge').insert(challenge);
        if (error) {
            throw error;
        }
        return data ? data[0] : null;
    }

    static async update(challenge: ChallengeUpdateDto) {
        const { data, error } = await supabase.from('challenge').update(challenge).eq('id', challenge.id);
        if (error) {
            throw error;
        }
        return data ? data[0] : null;
    }

    static async delete(id: string): Promise<void> {
        const { error } = await supabase.from('challenge').delete().eq('id', id);
        if (error) {
            throw error;
        }
    }
}
