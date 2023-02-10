interface ITranslation {
  AUTH: {
    SIGN_IN: string;
    SIGN_OUT: string;
  };
  BASE: {
    TITLE: string;
  };
  COORDINATE: {
    CONTROL: {
      ADD_COORDINATE: string;
      CHANGE_NAME: string;
      DROPDOWN: {
        LABEL: string;
        DUPLICATE: string;
        EXPORT: string;
        DELETE: string;
      };
      OPEN_POWER_SUMMARY: string;
    };
  };
  COPY: {
    LABEL: string;
    SUCCESS: string;
  };
  ERROR: {
    UNKNOWN_ERROR: string;
    INVALID_OPERATION: string;
    INVALID_JSON: string;
  };
  GEAR: {
    HEAD: string;
    CLOTHES: string;
    SHOES: string;
  };
  NAVIGATION: {
    MY_COORDINATES: string;
    IMPORT: string;
    EXPORT: string;
  };
  POWER: {
    NULL: string;
    INK_RECOVERY_UP: string;
    INK_RESISTANCE_UP: string;
    INK_SAVER_MAIN: string;
    INK_SAVER_SUB: string;
    INTENSIFY_ACTION: string;
    QUICK_RESPAWN: string;
    QUICK_SUPER_JUMP: string;
    RUN_SPEED_UP: string;
    SPECIAL_CHARGE_UP: string;
    SPECIAL_POWER_UP: string;
    SPECIAL_SAVER: string;
    SUB_POWER_UP: string;
    SUB_RESISTANCE_UP: string;
    SWIM_SPEED_UP: string;
    COMEBACK: string;
    LAST_DITCH_EFFORT: string;
    OPENING_GAMBIT: string;
    TENACITY: string;
    ABILITY_DOUBLER: string;
    HAUNT: string;
    NINJA_SQUID: string;
    RESPAWN_PUNISHER: string;
    THERMAL_INK: string;
    DROP_ROLLER: string;
    OBJECT_SHREDDER: string;
    STEALTH_JUMP: string;
  };
  SUMMARY: {
    LABEL: string;
  };
}

export const I18N_JA = {
  AUTH: {
    SIGN_IN: 'ログイン',
    SIGN_OUT: 'ログアウト',
  },
  BASE: {
    TITLE: 'Gearphore',
  },
  COORDINATE: {
    CONTROL: {
      ADD_COORDINATE: 'コーデを追加',
      CHANGE_NAME: 'コーデ名を変更',
      DROPDOWN: {
        LABEL: 'コーデ操作メニュー',
        DUPLICATE: '複製',
        EXPORT: 'エクスポート',
        DELETE: '削除',
      },
      OPEN_POWER_SUMMARY: 'サマリーを開く',
    },
  },
  COPY: {
    LABEL: 'コピー',
    SUCCESS: 'コピーしました',
  },
  ERROR: {
    UNKNOWN_ERROR: '不明なエラーが発生しました',
    INVALID_OPERATION: '不正な操作が行われました',
    INVALID_JSON: '入力データが破損しています',
  },
  GEAR: {
    HEAD: 'アタマ',
    CLOTHES: 'フク',
    SHOES: 'クツ',
  },
  NAVIGATION: {
    MY_COORDINATES: 'マイコーデ',
    IMPORT: 'インポート',
    EXPORT: 'エクスポート',
  },
  POWER: {
    NULL: 'なし',
    INK_RECOVERY_UP: 'インク回復力アップ',
    INK_RESISTANCE_UP: '相手インク影響軽減',
    INK_SAVER_MAIN: 'メイン効率アップ',
    INK_SAVER_SUB: 'サブ効率アップ',
    INTENSIFY_ACTION: 'アクション強化',
    QUICK_RESPAWN: '復活時間短縮',
    QUICK_SUPER_JUMP: 'スーパージャンプ時間短縮',
    RUN_SPEED_UP: 'ヒト移動速度アップ',
    SPECIAL_CHARGE_UP: 'スペシャル増加量アップ',
    SPECIAL_POWER_UP: 'スペシャル性能アップ',
    SPECIAL_SAVER: 'スペシャル減少量ダウン',
    SUB_POWER_UP: 'サブ性能アップ',
    SUB_RESISTANCE_UP: 'サブ影響軽減',
    SWIM_SPEED_UP: 'イカダッシュ速度アップ',
    COMEBACK: 'カムバック',
    LAST_DITCH_EFFORT: 'ラストスパート',
    OPENING_GAMBIT: 'スタートダッシュ',
    TENACITY: '逆境強化',
    ABILITY_DOUBLER: '追加ギアパワー倍化',
    HAUNT: 'リベンジ',
    NINJA_SQUID: 'イカニンジャ',
    RESPAWN_PUNISHER: '復活ペナルティアップ',
    THERMAL_INK: 'サーマルインク',
    DROP_ROLLER: '受け身術',
    OBJECT_SHREDDER: '対物攻撃力アップ',
    STEALTH_JUMP: 'ステルスジャンプ',
  },
  SUMMARY: {
    LABEL: 'サマリー',
  },
} as const satisfies ITranslation;

export const I18N_EN = {
  AUTH: {
    SIGN_IN: 'Sign in',
    SIGN_OUT: 'Sign out',
  },
  BASE: {
    TITLE: 'Gearphore',
  },
  COORDINATE: {
    CONTROL: {
      ADD_COORDINATE: 'Add coordinate',
      CHANGE_NAME: 'Change name',
      DROPDOWN: {
        LABEL: 'Coordinate control menu',
        DUPLICATE: 'Duplicate',
        EXPORT: 'Export',
        DELETE: 'Delete',
      },
      OPEN_POWER_SUMMARY: 'Open summary',
    },
  },
  COPY: {
    LABEL: 'Copy',
    SUCCESS: 'Copied',
  },
  ERROR: {
    UNKNOWN_ERROR: 'An unknown error occurred',
    INVALID_OPERATION: 'Invalid operation',
    INVALID_JSON: 'Input data is corrupted',
  },
  GEAR: {
    HEAD: 'Head',
    CLOTHES: 'Clothes',
    SHOES: 'Shoes',
  },
  NAVIGATION: {
    MY_COORDINATES: 'My coordinates',
    IMPORT: 'Import',
    EXPORT: 'Export',
  },
  POWER: {
    NULL: 'None',
    INK_RECOVERY_UP: 'Ink Recovery Up',
    INK_RESISTANCE_UP: 'Ink Resistance Up',
    INK_SAVER_MAIN: 'Ink Saver (Main)',
    INK_SAVER_SUB: 'Ink Saver (Sub)',
    INTENSIFY_ACTION: 'Intensify Action',
    QUICK_RESPAWN: 'Quick Respawn',
    QUICK_SUPER_JUMP: 'Quick Super Jump',
    RUN_SPEED_UP: 'Run Speed Up',
    SPECIAL_CHARGE_UP: 'Special Charge Up',
    SPECIAL_POWER_UP: 'Special Power Up',
    SPECIAL_SAVER: 'Special Saver',
    SUB_POWER_UP: 'Sub Power Up',
    SUB_RESISTANCE_UP: 'Sub Resistance Up',
    SWIM_SPEED_UP: 'Swim Speed Up',
    COMEBACK: 'Comeback',
    LAST_DITCH_EFFORT: 'Last-Ditch Effort',
    OPENING_GAMBIT: 'Opening Gambit',
    TENACITY: 'Tenacity',
    ABILITY_DOUBLER: 'Ability Doubler',
    HAUNT: 'Haunt',
    NINJA_SQUID: 'Ninja Squid',
    RESPAWN_PUNISHER: 'Respawn Punisher',
    THERMAL_INK: 'Thermal Ink',
    DROP_ROLLER: 'Drop Roller',
    OBJECT_SHREDDER: 'Object Shredder',
    STEALTH_JUMP: 'Stealth Jump',
  },
  SUMMARY: {
    LABEL: 'Summary',
  },
} as const satisfies ITranslation;
