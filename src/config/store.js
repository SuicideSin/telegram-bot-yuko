const store = {
  stores: [
    {
      name: 'sessions',
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
      name: 'tempSessions',
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
