import { CondominioInfo } from '@/types/form';

export const condominiosInfo: Record<string, CondominioInfo> = {
  'EDF. LUCIANO COSTA': {
    nome: 'EDF. LUCIANO COSTA',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  'EDF. LOFT CASA FORTE': {
    nome: 'EDF. LOFT CASA FORTE',
    comercial: 'AMANDA TR',
    tipo: 'interno'
  },
  // ... outros condomínios existentes
};

export const associacoesInfo: Record<string, CondominioInfo> = {
  'SISMO - Servidores Municipais de Olinda': {
    nome: 'SISMO - Servidores Municipais de Olinda',
    comercial: 'JULIO',
    tipo: 'interno'
  },
  'ACS - Cabos e Soldados PM/BM': {
    nome: 'ACS - Cabos e Soldados PM/BM',
    comercial: 'JULIO',
    tipo: 'interno'
  },
  // ... outras associações existentes
};

export const circulosMilitaresInfo: Record<string, CondominioInfo> = {
  'Círculo Militar de Pernambuco': {
    nome: 'Círculo Militar de Pernambuco',
    comercial: 'JULIO',
    tipo: 'interno'
  },
  'Círculo Militar do Recife': {
    nome: 'Círculo Militar do Recife',
    comercial: 'JULIO',
    tipo: 'interno'
  }
}; 