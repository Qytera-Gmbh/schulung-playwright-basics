/**
 * @see https://api.mattermost.com/#tag/system/operation/GetConfig
 */
export interface ServerConfiguration {
  AnalyticsSettings: {
    MaxUsersForStatistics: number;
  };
  ClusterSettings: {
    Enable: boolean;
    InterNodeListenAddress: string;
    InterNodeUrls: string[];
  };
  ComplianceSettings: {
    Directory: string;
    Enable: boolean;
    EnableDaily: boolean;
  };
  EmailSettings: {
    ConnectionSecurity: string;
    EmailBatchingBufferSize: number;
    EmailBatchingInterval: number;
    EnableEmailBatching: boolean;
    EnablePreviewModeBanner: boolean;
    EnableSignInWithEmail: boolean;
    EnableSignInWithUsername: boolean;
    EnableSignUpWithEmail: boolean;
    FeedbackEmail: string;
    FeedbackName: string;
    FeedbackOrganization: string;
    InviteSalt: string;
    PasswordResetSalt: string;
    PushNotificationContents: string;
    PushNotificationServer: string;
    RequireEmailVerification: boolean;
    SendEmailNotifications: boolean;
    SendPushNotifications: boolean;
    SMTPPassword: string;
    SMTPPort: string;
    SMTPServer: string;
    SMTPUsername: string;
  };
  FileSettings: {
    AmazonS3AccessKeyId: string;
    AmazonS3Bucket: string;
    AmazonS3Endpoint: string;
    AmazonS3Region: string;
    AmazonS3SecretAccessKey: string;
    AmazonS3SSL: boolean;
    Directory: string;
    DriverName: string;
    EnablePublicLink: boolean;
    InitialFont: string;
    MaxFileSize: number;
    PreviewHeight: number;
    PreviewWidth: number;
    ProfileHeight: number;
    ProfileWidth: number;
    PublicLinkSalt: string;
    ThumbnailHeight: number;
    ThumbnailWidth: number;
  };
  GitLabSettings: {
    AuthEndpoint: string;
    Enable: boolean;
    Id: string;
    Scope: string;
    Secret: string;
    TokenEndpoint: string;
    UserApiEndpoint: string;
  };
  GoogleSettings: {
    AuthEndpoint: string;
    Enable: boolean;
    Id: string;
    Scope: string;
    Secret: string;
    TokenEndpoint: string;
    UserApiEndpoint: string;
  };
  LdapSettings: {
    BaseDN: string;
    BindPassword: string;
    BindUsername: string;
    ConnectionSecurity: string;
    EmailAttribute: string;
    Enable: boolean;
    FirstNameAttribute: string;
    IdAttribute: string;
    LastNameAttribute: string;
    LdapPort: number;
    LdapServer: string;
    LoginFieldName: string;
    MaxPageSize: number;
    NicknameAttribute: string;
    PositionAttribute: string;
    QueryTimeout: number;
    SkipCertificateVerification: boolean;
    SyncIntervalMinutes: number;
    UserFilter: string;
    UsernameAttribute: string;
  };
  LocalizationSettings: {
    AvailableLocales: string;
    DefaultClientLocale: string;
    DefaultServerLocale: string;
  };
  LogSettings: {
    ConsoleLevel: string;
    EnableConsole: boolean;
    EnableDiagnostics: boolean;
    EnableFile: boolean;
    EnableWebhookDebugging: boolean;
    FileLevel: string;
    FileLocation: string;
  };
  MetricsSettings: {
    BlockProfileRate: number;
    Enable: boolean;
    ListenAddress: string;
  };
  NativeAppSettings: {
    AndroidAppDownloadLink: string;
    AppDownloadLink: string;
    IosAppDownloadLink: string;
  };
  Office365Settings: {
    AuthEndpoint: string;
    Enable: boolean;
    Id: string;
    Scope: string;
    Secret: string;
    TokenEndpoint: string;
    UserApiEndpoint: string;
  };
  PasswordSettings: {
    Lowercase: boolean;
    MinimumLength: number;
    Number: boolean;
    Symbol: boolean;
    Uppercase: boolean;
  };
  PrivacySettings: {
    ShowEmailAddress: boolean;
    ShowFullName: boolean;
  };
  RateLimitSettings: {
    Enable: boolean;
    MaxBurst: number;
    MemoryStoreSize: number;
    PerSec: number;
    VaryByHeader: string;
    VaryByRemoteAddr: boolean;
  };
  SamlSettings: {
    AssertionConsumerServiceURL: string;
    EmailAttribute: string;
    Enable: boolean;
    Encrypt: boolean;
    FirstNameAttribute: string;
    IdpCertificateFile: string;
    IdpDescriptorUrl: string;
    IdpUrl: string;
    LastNameAttribute: string;
    LocaleAttribute: string;
    LoginButtonText: string;
    NicknameAttribute: string;
    PositionAttribute: string;
    PrivateKeyFile: string;
    PublicCertificateFile: string;
    UsernameAttribute: string;
    Verify: boolean;
  };
  ServiceSettings: {
    AllowCorsFrom: string;
    ConnectionSecurity: string;
    EnableAPIChannelDeletion: boolean;
    EnableCommands: boolean;
    EnableCustomEmoji: boolean;
    EnableDeveloper: boolean;
    EnableIncomingWebhooks: boolean;
    EnableInsecureOutgoingConnections: boolean;
    EnableMultifactorAuthentication: boolean;
    EnableOAuthServiceProvider: boolean;
    EnableOnlyAdminIntegrations: boolean;
    EnableOutgoingWebhooks: boolean;
    EnablePostIconOverride: boolean;
    EnablePostUsernameOverride: boolean;
    EnableSecurityFixAlert: boolean;
    EnableTesting: boolean;
    EnableUserAccessTokens: boolean;
    EnforceMultifactorAuthentication: boolean;
    Forward80To443: boolean;
    GoogleDeveloperKey: string;
    LetsEncryptCertificateCacheFile: string;
    ListenAddress: string;
    MaximumLoginAttempts: number;
    ReadTimeout: number;
    RestrictCustomEmojiCreation: string;
    SegmentDeveloperKey: string;
    SessionCacheInMinutes: number;
    SessionLengthMobileInDays: number;
    SessionLengthSSOInDays: number;
    SessionLengthWebInDays: number;
    SiteURL: string;
    TLSCertFile: string;
    TLSKeyFile: string;
    UseLetsEncrypt: boolean;
    WebserverMode: string;
    WebsocketPort: number;
    WebsocketSecurePort: number;
    WriteTimeout: number;
  };
  SqlSettings: {
    AtRestEncryptKey: string;
    DataSource: string;
    DataSourceReplicas: string[];
    DriverName: string;
    MaxIdleConns: number;
    MaxOpenConns: number;
    Trace: boolean;
  };
  SupportSettings: {
    AboutLink: string;
    HelpLink: string;
    PrivacyPolicyLink: string;
    ReportAProblemLink: string;
    SupportEmail: string;
    TermsOfServiceLink: string;
  };
  TeamSettings: {
    CustomBrandText: string;
    CustomDescriptionText: string;
    EnableCustomBrand: boolean;
    EnableOpenServer: boolean;
    EnableTeamCreation: boolean;
    EnableUserCreation: boolean;
    MaxChannelsPerTeam: number;
    MaxNotificationsPerChannel: number;
    MaxUsersPerTeam: number;
    RestrictCreationToDomains: string;
    RestrictDirectMessage: string;
    RestrictPrivateChannelCreation: string;
    RestrictPrivateChannelDeletion: string;
    RestrictPrivateChannelManagement: string;
    RestrictPublicChannelCreation: string;
    RestrictPublicChannelDeletion: string;
    RestrictPublicChannelManagement: string;
    RestrictTeamInvite: string;
    SiteName: string;
    UserStatusAwayTimeout: number;
  };
}
