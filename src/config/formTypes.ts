import { condominiosInfo, associacoesInfo, circulosMilitaresInfo } from '../data/entities';

export type FormType = 'instagram' | 'condominio' | 'associacao' | 'circulomilitar' | 'agencialean' | 'servrecife' | 'alumiaco' | 'prefeitura_floresta' | 'uvp' | 'oab' | 'tre' | 'flyer_condominios' 
| 'flyer_delivery' | 'max_beneficios' | 'atletas' | 'mormaiiday' | 'matchfit' | 'fesindico' | 'outubrorosa' 
| 'corpoDeBombeiros' | 'policiaMilitar' | "condBaronesaDaFonte" | "mcp" | "assembleia_seara" 
| "igreja_adventista" | "azure" | "rei_davi_condominio" | "autoescola_santana" 
| "cond_jardim_bela_vista" | "cia_athletica_recife" | "edf_praia_de_gamboa" | "cond_praia_da_pipa" | "socelme"
| "fast_solucoes" | "aspcre" | "edf_ilha_de_capri" | "ASSORRP" | "edf_iuca" | "loja_gota" | "edf_francisco_paula" | "la_furia" | "sismo" |"acs" | "sindguardas" | "sintro" | "sinpromg" | "sindprov" | "cond_edf_sol_mar" | "rede_hiperbom_clientes" | "rede_hiperbom_colaboradores" | "cond_ava_gardner" | "aspra" | "cia_do_corpo";

export interface FormConfig {
  title: string;
  description: string;
  submitText: string;
  successMessage: string;
  options?: {
    label: string;
    placeholder: string;
    items: Array<{
      value: string;
      label: string;
    }>;
  };
}

export const formConfigs: Record<FormType, FormConfig> = {
  instagram: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato."
  },
  condominio: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
    options: {
      label: "Condomínio",
      placeholder: "Selecione um condomínio...",
      items: Object.keys(condominiosInfo)
        .map(key => ({ value: key, label: condominiosInfo[key].nome }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    },
  },
  associacao: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
    options: {
      label: "Associação",
      placeholder: "Selecione uma associação...",
      items: Object.keys(associacoesInfo)
        .map(key => ({ value: key, label: associacoesInfo[key].nome }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    },
  },
  circulomilitar: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  },
  agencialean: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  }, 
  servrecife: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  }, 
  alumiaco: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  }, 
  prefeitura_floresta: {
    title: "ADERE - Servidor Floresta - PE tem 15% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  },
  uvp: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  },
  oab: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  },
  tre: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  },
  flyer_condominios: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
  },
  flyer_delivery: {
    title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
    description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
    submitText: "Enviar Formulário",
    successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    max_beneficios: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    atletas: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    mormaiiday: {
      title: "Você gasta energia no treino e a gente cuida da energia da sua casa!",
      description: "Agora que seu voucher está garantido, basta preencher o formulário para ativar 20% de desconto todos os meses.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    matchfit: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    fesindico: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    outubrorosa: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    corpoDeBombeiros: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    policiaMilitar: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    condBaronesaDaFonte: {
      title: "Cliente TR Energia tem até 15% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    mcp: {
      title: "Colaboradores da MPC podem garantir até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    assembleia_seara: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    igreja_adventista: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    azure: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    rei_davi_condominio: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    autoescola_santana: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    cond_jardim_bela_vista: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    cia_athletica_recife: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    edf_praia_de_gamboa: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    cond_praia_da_pipa: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    socelme: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    fast_solucoes: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    aspcre: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    edf_ilha_de_capri: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    }, 
    ASSORRP: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    edf_iuca: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    loja_gota: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    edf_francisco_paula: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    la_furia: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    sismo: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    acs: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    sindguardas: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    sintro: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    sinpromg: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    sindprov: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    cond_edf_sol_mar: {
      title: "Cliente TR Energia tem até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    rede_hiperbom_clientes: {
      title: "Clientes da Rede Hiperbom têm até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    rede_hiperbom_colaboradores: {
      title: "Colaboradores da Rede Hiperbom têm até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    cond_ava_gardner: {
      title: "Clientes TR têm até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    aspra: {
      title: "Clientes TR têm até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
    cia_do_corpo: {
      title: "Clientes TR têm até 20% de desconto na conta de energia!",
      description: "Preencha o formulário abaixo para receber sua proposta personalizada e descobrir como aproveitar esse benefício exclusivo.",
      submitText: "Enviar Formulário",
      successMessage: "Obrigado! Em breve entraremos em contato.",
    },
  }; 