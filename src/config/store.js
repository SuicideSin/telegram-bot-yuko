const store = {
  stores: [
    {
      name: 'shared',
    },
    {
      name: 'session',
      options: {
        timestampData: true,
      },
      indexingRules: [
        {
          fieldName: 'username',
          unique: true,
        },
      ],
    },
    {
      name: 'temp',
      options: {
        timestampData: true,
      },
      indexingRules: [
        {
          fieldName: 'username',
          unique: true,
        },
        {
          fieldName: 'updatedAt',
          expireAfterSeconds: 3600,
        },
      ],
    },
  ],
};

export {
  store as default,
};
