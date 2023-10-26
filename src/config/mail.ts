interface IMailConfig {
  driver: 'ethereal' | 'aws';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'info@guita.com', // email padrão de envio
      name: 'Guita Transfer',
    },
  },
} as IMailConfig;
