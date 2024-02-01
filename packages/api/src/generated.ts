import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
import { ClientError } from 'graphql-request';
import useSWR, { SWRConfiguration as SWRConfigInterface, Key as SWRKeyInterface } from 'swr';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    Any: { input: any; output: any };
    BigInt: { input: any; output: any };
    DateTime: { input: string; output: string };
    Email: { input: any; output: any };
    Percent: { input: any; output: any };
    RgbColorChannel: { input: any; output: any };
    Url: { input: any; output: any };
};

export type Account = Node & {
    __typename?: 'Account';
    /** `Account` Id. */
    id: Scalars['ID']['output'];
    /** List and search `UserGroupItems`. */
    userGroups?: Maybe<UserGroupItems>;
    /** List and search `UserItems`. */
    users?: Maybe<UserItems>;
};

export type AccountUserGroupsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type AccountUsersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type AccountUser = Node &
    User & {
        __typename?: 'AccountUser';
        /** `AccountUser` avatar. */
        avatar?: Maybe<Scalars['Url']['output']>;
        /** `AccountUser` email. */
        email: Scalars['Email']['output'];
        /** `AccountUser` Id. */
        id: Scalars['ID']['output'];
        /** `AccountUser` name. */
        name?: Maybe<Scalars['String']['output']>;
    };

export type AddAssetLicense = {
    __typename?: 'AddAssetLicense';
    /** `Asset` details. */
    asset?: Maybe<Asset>;
    /** `License` details. */
    license?: Maybe<License>;
};

export type AddAssetLicenseInput = {
    /** `Asset` Id. */
    assetId: Scalars['ID']['input'];
    /** `License` Id. */
    licenseId: Scalars['ID']['input'];
};

export type AddAssetMetadataFieldValue = {
    __typename?: 'AddAssetMetadataFieldValue';
    /** `DateTime` of the `MetadataValue` creation. */
    createdAt: Scalars['DateTime']['output'];
    /** `User` who created the `MetadataValue`. */
    creator: User;
    /** `MetadataValue` Id. */
    id: Scalars['ID']['output'];
    /** `MetadataField` related to the `MetadataValue`. */
    metadataField: MetadataField;
    /** `DateTime` of the `MetadataValue` last modification. */
    modifiedAt?: Maybe<Scalars['DateTime']['output']>;
    /** `User` who last modified the `MetadataValue`. */
    modifier?: Maybe<User>;
    /** `MetadataValue` value. */
    value: Scalars['String']['output'];
};

export type AddAssetMetadataFieldValueInput = {
    /** `Asset` Id. */
    assetId: Scalars['ID']['input'];
    /** Metadata field Id. */
    metadataFieldId: Scalars['ID']['input'];
    /** Value to be assigned to `Asset` and `Metadata Field`. */
    value: Scalars['String']['input'];
};

export type AddAssetPreviewImage = {
    __typename?: 'AddAssetPreviewImage';
    /** The newly created `Asset` preview image processing job response. */
    job: AssetPreviewProcessingJob;
};

export type AddAssetPreviewImageInput = {
    /** `Asset` Id. */
    assetId: Scalars['ID']['input'];
    /** `File` Id. Signed Id returned by `uploadFile` mutation. */
    fileId: Scalars['ID']['input'];
};

export type AddAssetRelations = {
    __typename?: 'AddAssetRelations';
    /** `Asset` details. */
    asset: Asset;
    /** Related `Assets` details. */
    relatedAssets?: Maybe<Array<Maybe<Asset>>>;
};

export type AddAssetRelationsInput = {
    /** `Asset` Id. */
    assetId: Scalars['ID']['input'];
    /** Related `Asset` Id list. */
    relatedAssetIds: Array<InputMaybe<Scalars['ID']['input']>>;
};

export type AddAssetTags = {
    __typename?: 'AddAssetTags';
    /** `Asset` details. */
    asset?: Maybe<Asset>;
};

export type AddAssetTagsInput = {
    /** `Asset` Id. */
    id: Scalars['ID']['input'];
    /** List of `Tag` values linked to `Asset`. */
    tags?: InputMaybe<Array<InputMaybe<TagInput>>>;
};

export type AddCollectionAssets = {
    __typename?: 'AddCollectionAssets';
    /** `Collection` details. */
    collection?: Maybe<Collection>;
};

export type AddCollectionAssetsInput = {
    /** Ids of the `Assets` to add to the `Collection`. Must be in the same `Library` as the `Collection`. */
    assetIds: Array<Scalars['ID']['input']>;
    /** `Collection` Id. */
    collectionId: Scalars['ID']['input'];
};

export type AddCustomMetadata = {
    __typename?: 'AddCustomMetadata';
    /** List of the parent Ids where the new `CustomMetadata` values were added. */
    parentIds: Array<Scalars['ID']['output']>;
};

export type AddCustomMetadataInput = {
    /** `CustomMetadata` property and respective values to add to the given set of parents. */
    customMetadata: Array<CustomMetadataInput>;
    /** Set of parent Ids to which `CustomMetadata` should be added. */
    parentIds: Array<Scalars['ID']['input']>;
};

export type AddCustomMetadataPropertyOptionInput = {
    /** Define `CustomMetadataPropertyOption` as default. Applies to newly created `Assets` only. */
    isDefault?: InputMaybe<Scalars['Boolean']['input']>;
    /** `CustomMetadataPropertyOption` value. */
    value: Scalars['String']['input'];
};

export type AddCustomMetadataPropertyOptions = {
    __typename?: 'AddCustomMetadataPropertyOptions';
    /** `CustomMetadataProperty` details. */
    customMetadataProperty: CustomMetadataProperty;
};

export type AddCustomMetadataPropertyOptionsInput = {
    /** List of `CustomMetadataPropertyOption` items to add to existing `CustomMetadataProperty`. */
    options: Array<AddCustomMetadataPropertyOptionInput>;
    /** `CustomMetadataProperty` Id. */
    propertyId: Scalars['ID']['input'];
};

/** `AssetInterface` for `Asset` returnable types. */
export type Asset = {
    /** List of `Asset`'s `Attachments`. */
    attachments?: Maybe<Array<Maybe<AssetAttachment>>>;
    /** Paginated list of `AssetComment` items for `Asset`. */
    comments?: Maybe<AssetCommentItems>;
    /** `Asset` copyright details. */
    copyright?: Maybe<Copyright>;
    /** DateTime of the `Asset` creation. */
    createdAt: Scalars['DateTime']['output'];
    /** The `creator` is the `User` who created the asset on Frontify. */
    creator: User;
    /** `Asset` permissions of the current `User`. */
    currentUserPermissions: AssetUserPermissions;
    /** List of `CustomMetadataProperty` items and values associated to `Asset`. */
    customMetadata: Array<CustomMetadata>;
    /** Description of the `Asset`. */
    description?: Maybe<Scalars['String']['output']>;
    /** `Asset` expiration date. */
    expiresAt?: Maybe<Scalars['DateTime']['output']>;
    /** External Id of the `Asset`. */
    externalId?: Maybe<Scalars['ID']['output']>;
    /** `Asset` id. */
    id: Scalars['ID']['output'];
    /** List of `Asset`'s licenses. */
    licenses?: Maybe<Array<Maybe<License>>>;
    /**
     * **DEPRECATED** Metadata values details. This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    metadataValues?: Maybe<Array<Maybe<MetadataValue>>>;
    /** DateTime of the `Asset`'s last modification. */
    modifiedAt?: Maybe<Scalars['DateTime']['output']>;
    /** The `modifier` is the `User` who last modified the asset on Frontify. */
    modifier?: Maybe<User>;
    /** Paginated list of `Asset` items related to `Asset`. */
    relatedAssets: AssetItems;
    /** Represents the conversion status of the `Asset`. Example: FINISHED. */
    status: AssetStatusType;
    /** List of `Asset`'s tags. */
    tags?: Maybe<Array<Maybe<Tag>>>;
    /** Title of the `Asset`. */
    title: Scalars['String']['output'];
};

/** `AssetInterface` for `Asset` returnable types. */
export type AssetCommentsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<AssetCommentQueryInput>;
};

/** `AssetInterface` for `Asset` returnable types. */
export type AssetRelatedAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type AssetAttachment = Attachment &
    Node & {
        __typename?: 'AssetAttachment';
        /** `DateTime` of the `Attachment` creation. */
        createdAt: Scalars['DateTime']['output'];
        /** The `creator` is the `User` who created this `Attachment`. */
        creator: User;
        /** Signed `Url` to download the original `AssetAttachment` from Frontify. */
        downloadUrl?: Maybe<Scalars['Url']['output']>;
        /** Extension of the `Attachment` `File`. */
        extension?: Maybe<Scalars['String']['output']>;
        /** External Id of the `Attachment`. */
        externalId?: Maybe<Scalars['ID']['output']>;
        /** Filename of the `Attachment` `File`. */
        filename?: Maybe<Scalars['String']['output']>;
        /** `Attachment` Id. */
        id: Scalars['ID']['output'];
        /** `DateTime` of the `Attachment`last modification. */
        modifiedAt?: Maybe<Scalars['DateTime']['output']>;
        /** The `modifier` is the `User` who last modified this `Attachment`. */
        modifier?: Maybe<User>;
        /** Name of the `Attachment`. */
        name?: Maybe<Scalars['String']['output']>;
        /** Size of the `Attachment` `File` in bytes. */
        size?: Maybe<Scalars['BigInt']['output']>;
        /** Mediatype (MIME) of the `Attachment`. */
        type?: Maybe<Scalars['String']['output']>;
    };

export type AssetAttachmentDownloadUrlArgs = {
    permanent?: InputMaybe<Scalars['Boolean']['input']>;
    validityInDays?: InputMaybe<Scalars['Int']['input']>;
};

export type AssetComment = Comment &
    Node & {
        __typename?: 'AssetComment';
        /** The content of the `AssetComment`. Contains `User` mentions in the format `@[user:USER_ID].` */
        content: Scalars['String']['output'];
        /** `DateTime` of the `AssetComment`'s creation. */
        createdAt: Scalars['DateTime']['output'];
        /** `User` who created the `AssetComment`. */
        creator: User;
        /** `AssetComment` permissions of the current `User`. */
        currentUserPermissions: AssetCommentUserPermissions;
        /** `AssetComment` id. */
        id: Scalars['ID']['output'];
        /** Indicates if an `AssetComment` is resolved or not. */
        isResolved: Scalars['Boolean']['output'];
        /** The `AssetComment` `Marking` if it exists. */
        marking?: Maybe<Marking>;
        /** Mentioned `User` list in the `content` field. */
        mentionedUsers: Array<Maybe<User>>;
        /** `DateTime` of the `AssetComment`'s last modification. */
        modifiedAt?: Maybe<Scalars['DateTime']['output']>;
        /** `User` who last modified the `AssetComment`. */
        modifier?: Maybe<User>;
        /** `AssetComment`'s `AssetCommentReplyItems` list. */
        replies: AssetCommentReplyItems;
    };

export type AssetCommentRepliesArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type AssetCommentItems = {
    __typename?: 'AssetCommentItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** List of `AssetComment` type comments. */
    items?: Maybe<Array<Maybe<AssetComment>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type AssetCommentQueryInput = {
    /** Filter `AssetComment` by status. */
    status?: AssetCommentStatusFilter;
};

export type AssetCommentReply = Comment & {
    __typename?: 'AssetCommentReply';
    /** The content of the `AssetCommentReply`. Contains `User` mentions in the format `@[user:USER_ID].` */
    content: Scalars['String']['output'];
    /** The `DateTime` of creation. */
    createdAt: Scalars['DateTime']['output'];
    /** The `User` representing the creator. */
    creator: User;
    /** The id of the current `AssetCommentReply`. */
    id: Scalars['ID']['output'];
    /** Mentioned `User` list in the `content` field. */
    mentionedUsers: Array<Maybe<User>>;
    /** The `DateTime` of the last modification. */
    modifiedAt?: Maybe<Scalars['DateTime']['output']>;
    /** The `User` representing the last modifier. */
    modifier?: Maybe<User>;
};

export type AssetCommentReplyItems = {
    __typename?: 'AssetCommentReplyItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** List of type `AssetCommentReply`. */
    items?: Maybe<Array<Maybe<AssetCommentReply>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

/** Defines how the `AssetComment` list should be filtered. */
export enum AssetCommentStatusFilter {
    All = 'ALL',
    Open = 'OPEN',
    Resolved = 'RESOLVED',
}

export type AssetCommentUserPermissions = {
    __typename?: 'AssetCommentUserPermissions';
    /** Check if the current user can delete this `AssetComment`. */
    canDelete: Scalars['Boolean']['output'];
    /** Check if the current user can edit this `AssetComment`. */
    canEdit: Scalars['Boolean']['output'];
    /** Check if the current user can reply to this `AssetComment`. */
    canReply: Scalars['Boolean']['output'];
};

export type AssetItems = {
    __typename?: 'AssetItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** `Asset` items list. */
    items?: Maybe<Array<Maybe<Asset>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type AssetPreviewProcessingJob = {
    __typename?: 'AssetPreviewProcessingJob';
    /** `Asset` Id. */
    assetId: Scalars['ID']['output'];
};

export type AssetProcessingJob = {
    __typename?: 'AssetProcessingJob';
    /** `Asset` Id. */
    assetId: Scalars['ID']['output'];
};

export type AssetQueryFilterConditionInput = {
    /** **REQUIRED** for type `CUSTOM_METADATA_VALUE` to identify which `CustomMetadataProperty` it is compared against. You can find all available `CustomMetadataProperty` on the project. */
    customMetadataPropertyId?: InputMaybe<Scalars['ID']['input']>;
    /** **REQUIRED** for type `METADATA_VALUE` to identify which metadata field it is compared against. You can find all available `metadataFields` on the project. */
    metadataFieldId?: InputMaybe<Scalars['ID']['input']>;
    /** Defines how the value of the `Asset` is compared to the provided value. */
    operator?: InputMaybe<ConditionOperator>;
    /** Defines which property of the `Asset` is compared to the provided value. */
    type: ConditionType;
    /** The value which is compared against the property of the `Asset`. */
    value: Scalars['String']['input'];
};

export type AssetQueryFilterInput = {
    /** The Asset must pass **all conditions** in this List to be present in the result set. */
    andConditions?: InputMaybe<Array<InputMaybe<AssetQueryFilterConditionInput>>>;
    /** The Asset must pass **at least one condition** in this List to be present in the result set. */
    orConditions?: InputMaybe<Array<InputMaybe<AssetQueryFilterConditionInput>>>;
};

/** Search sorting option. Defines how the search results should be sorted. */
export enum AssetQueryFilterSortType {
    /** Sorts the results by the newest `Assets`. */
    Newest = 'NEWEST',
    /** Sorts the results by the oldest `Assets`. */
    Oldest = 'OLDEST',
    /** Sorts the results by the relevance (query score). */
    Relevance = 'RELEVANCE',
    /** Sorts the results ascending by the title of the `Assets`. */
    TitleAscending = 'TITLE_ASCENDING',
    /** sorts the results descending by the title of the `Assets`. */
    TitleDescending = 'TITLE_DESCENDING',
}

export type AssetQueryInFolderInput = {
    /** `Folder` Id. */
    id: Scalars['ID']['input'];
};

export type AssetQueryInput = {
    /** Limit the result set by the externalId of an `Asset`. */
    externalId?: InputMaybe<Scalars['ID']['input']>;
    /** Use filters to reduce the set of matched `Asset` items by complex filtering. */
    filter?: InputMaybe<AssetQueryFilterInput>;
    /** Limit the result set to a specific `Folder` of this `Library`. */
    inFolder?: InputMaybe<AssetQueryInFolderInput>;
    /** Limit the result set by the search term. */
    search?: InputMaybe<Scalars['String']['input']>;
    /** Sort set of the matched `AssetItems`. */
    sortBy?: InputMaybe<AssetQueryFilterSortType>;
    /** **DEPRECATED** Filter the `Asset` types present in the result set. This field will be removed. Use `types` instead. | Date: 2022-07-01T00:00:00.000+00:00 */
    type?: InputMaybe<Array<InputMaybe<AssetType>>>;
    /** Limit the result set by the `Asset` types. */
    types?: InputMaybe<Array<InputMaybe<AssetType>>>;
};

/** List of possible `Asset` status types. */
export enum AssetStatusType {
    Finished = 'FINISHED',
    Processing = 'PROCESSING',
    ProcessingFailed = 'PROCESSING_FAILED',
}

/** The type of an `asset`. */
export enum AssetType {
    Audio = 'AUDIO',
    Document = 'DOCUMENT',
    File = 'FILE',
    Image = 'IMAGE',
    Video = 'VIDEO',
}

export type AssetUserPermissions = {
    __typename?: 'AssetUserPermissions';
    /** Check if current user has `Comment` creation permissions for a specific `Asset`. */
    canComment: Scalars['Boolean']['output'];
    /** Check if current user has `Asset` deleting permissions for a specific `Asset`. */
    canDelete: Scalars['Boolean']['output'];
    /** Check if current user has `Asset` download permissions for a specific `Asset`. */
    canDownload: Scalars['Boolean']['output'];
    /** Check if current user has `Asset` editing permissions for a specific `Asset`. */
    canEdit: Scalars['Boolean']['output'];
};

/** `AttachmentInterface` for `Attachment` returnable types. */
export type Attachment = {
    /** `DateTime` of the `Attachment` creation. */
    createdAt: Scalars['DateTime']['output'];
    /** The `User` who created the `Attachment` on Frontify. */
    creator: User;
    /** The `Attachment`'s original file extension. */
    extension?: Maybe<Scalars['String']['output']>;
    /** The `Attachment`'s External Id. */
    externalId?: Maybe<Scalars['ID']['output']>;
    /** The `Attachment`'s filename. */
    filename?: Maybe<Scalars['String']['output']>;
    /** `Attachment` Id. */
    id: Scalars['ID']['output'];
    /** `DateTime` of the `Attachment`'s last modification. */
    modifiedAt?: Maybe<Scalars['DateTime']['output']>;
    /** The `User` who last modified the `Attachment` on Frontify. */
    modifier?: Maybe<User>;
    /** The `Attachment`'s name or title. */
    name?: Maybe<Scalars['String']['output']>;
    /** The `Attachment`'s size in bytes. */
    size?: Maybe<Scalars['BigInt']['output']>;
    /** The `Attachment`'s Media (MIME) type. */
    type?: Maybe<Scalars['String']['output']>;
};

export type AttachmentProcessingJob = {
    __typename?: 'AttachmentProcessingJob';
    /** `Attachment` Id. */
    attachmentId: Scalars['ID']['output'];
};

export type Audio = Asset &
    Node & {
        __typename?: 'Audio';
        /** `Attachment` items linked to `Asset`. */
        attachments?: Maybe<Array<Maybe<AssetAttachment>>>;
        /** Represents the Author of the `Asset`. Example: Photographer Name. */
        author?: Maybe<Scalars['String']['output']>;
        /** Paginated list of `AssetComment` items for `Asset`. */
        comments?: Maybe<AssetCommentItems>;
        /** `Asset` copyright details. */
        copyright?: Maybe<Copyright>;
        /** `DateTime` of the `Asset` creation. */
        createdAt: Scalars['DateTime']['output'];
        /** The `User` who created the `Asset`. */
        creator: User;
        /** Current `User` `Asset` permissions. */
        currentUserPermissions: AssetUserPermissions;
        /** List of `CustomMetadataProperty` items and values associated to `Asset`. */
        customMetadata: Array<CustomMetadata>;
        /** Description of the `Asset`. */
        description?: Maybe<Scalars['String']['output']>;
        /** Signed `Url` to download the original `Audio` type file. */
        downloadUrl?: Maybe<Scalars['Url']['output']>;
        /** `Asset` expiry date. */
        expiresAt?: Maybe<Scalars['DateTime']['output']>;
        /** Extension of the `Asset` `File`. */
        extension: Scalars['String']['output'];
        /** External Id of the `Asset`. */
        externalId?: Maybe<Scalars['ID']['output']>;
        /** `ExternalProduct` items linked to `Asset`. */
        externalProducts?: Maybe<Array<Maybe<ExternalProduct>>>;
        /** Original filename of the `Asset` `File`. */
        filename?: Maybe<Scalars['String']['output']>;
        /** `Asset` id. */
        id: Scalars['ID']['output'];
        /** `License` items linked to `Asset`. */
        licenses?: Maybe<Array<Maybe<License>>>;
        /**
         * **DEPRECATED** `MetadataValue` items linked to `Asset`. This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
         */
        metadataValues?: Maybe<Array<Maybe<MetadataValue>>>;
        /** `DateTime` of the `Asset` last modification. */
        modifiedAt?: Maybe<Scalars['DateTime']['output']>;
        /** The `User` who last modified the `Asset`. */
        modifier?: Maybe<User>;
        /** Preview `Url` of converted `Audio` file in mp3 format. */
        previewUrl: Scalars['Url']['output'];
        /** Paginated list of `Asset` items related to `Asset`. */
        relatedAssets: AssetItems;
        /** Size of the `Asset` `File` in bytes. */
        size?: Maybe<Scalars['BigInt']['output']>;
        /** Represents the conversion status of the `Asset`. Example: FINISHED. */
        status: AssetStatusType;
        /** List of `Tag` items linked to `Asset` */
        tags?: Maybe<Array<Maybe<Tag>>>;
        /** Title of the `Asset`. */
        title: Scalars['String']['output'];
    };

export type AudioCommentsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<AssetCommentQueryInput>;
};

export type AudioDownloadUrlArgs = {
    permanent?: InputMaybe<Scalars['Boolean']['input']>;
    validityInDays?: InputMaybe<Scalars['Int']['input']>;
};

export type AudioPreviewUrlArgs = {
    height?: InputMaybe<Scalars['Int']['input']>;
    width?: InputMaybe<Scalars['Int']['input']>;
};

export type AudioRelatedAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type Brand = Node & {
    __typename?: 'Brand';
    /** `Brand` avatar. */
    avatar?: Maybe<Scalars['Url']['output']>;
    /**
     * **DEPRECATED** `Brand` color. This field will be removed. Use `rgbaColor` instead. | Date: 2023-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `rgbaColor` instead. | Date: 2023-01-01T00:00:00.000+00:00
     */
    color?: Maybe<Scalars['String']['output']>;
    /** `Brand` `CustomMetadataProperty` items list. */
    customMetadataProperties: Array<CustomMetadataProperty>;
    /** `Brand` Id. */
    id: Scalars['ID']['output'];
    /** Retrieve all `Library` items. */
    libraries?: Maybe<LibraryItems>;
    /** `Brand` name. */
    name: Scalars['String']['output'];
    /**
     * **DEPRECATED** Retrieve all `Projects`. This field will be removed. Use `libraries` or `workspaceProjects` instead. | Date: 2023-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `libraries` or `workspaceProjects` instead. | Date: 2023-01-01T00:00:00.000+00:00
     */
    projects?: Maybe<Array<Maybe<Project>>>;
    /** `Brand` color. */
    rgbaColor?: Maybe<RgbaColor>;
    /** `Brand` slug. */
    slug?: Maybe<Scalars['String']['output']>;
    /** Retrieve all `Workspace` items. */
    workspaceProjects?: Maybe<WorkspaceItems>;
};

export type BrandLibrariesArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type BrandProjectsArgs = {
    types?: InputMaybe<Array<InputMaybe<ProjectType>>>;
};

export type BrandWorkspaceProjectsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type Breadcrumb = {
    __typename?: 'Breadcrumb';
    /** `Breadcrumb` folder id. */
    id?: Maybe<Scalars['ID']['output']>;
    /** `Breadcrumb` folder name. */
    name?: Maybe<Scalars['String']['output']>;
};

export type Collection = Node & {
    __typename?: 'Collection';
    /** `Collection`'s `Asset` items list. */
    assets: AssetItems;
    /** `Collection`'s permissions of the current `User`. */
    currentUserPermissions: CollectionUserPermissions;
    /** `Collection` Id. */
    id: Scalars['ID']['output'];
    /**
     * **DEPRECATED** `Collection`'s privacy state setting. This field will be removed. | Date: 2024-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. | Date: 2024-01-01T00:00:00.000+00:00
     */
    isPrivate?: Maybe<Scalars['Boolean']['output']>;
    /** `Collection` name. */
    name: Scalars['String']['output'];
};

export type CollectionAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type CollectionItems = {
    __typename?: 'CollectionItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** List of `Collection` items. */
    items?: Maybe<Array<Maybe<Collection>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type CollectionUserPermissions = {
    __typename?: 'CollectionUserPermissions';
    /** Check if the current user can add `Assets` in this `Collection`. */
    canAddAssets: Scalars['Boolean']['output'];
    /** Check if the current user can remove `Assets` from this `Collection`. */
    canRemoveAssets: Scalars['Boolean']['output'];
};

/** `CommentInterface` for `Comment` returnable types. */
export type Comment = {
    /** The `Comment` message. */
    content: Scalars['String']['output'];
    /** The `DateTime` of the `Comment` creation. */
    createdAt: Scalars['DateTime']['output'];
    /** The `User` representing the `Comment` creator. */
    creator: User;
    /** The `Comment` identifier. */
    id: Scalars['ID']['output'];
    /** The `DateTime` of the `Comment` last modification. */
    modifiedAt?: Maybe<Scalars['DateTime']['output']>;
    /** The last `User` to modify the `Comment`. */
    modifier?: Maybe<User>;
};

/**
 * Condition operators. Defines how the value of the `Asset` is compared to the provided value.
 * Supported Operators:
 * - **IS**: equals to the provided value.
 * - **IS_NOT**: is not equal to provided value.
 */
export enum ConditionOperator {
    Is = 'IS',
    IsNot = 'IS_NOT',
}

/**
 * Condition types. A Condition defines which field value of the `Asset` is compared against a given value.
 * We currently support 4 different kinds of Conditions on `Assets`:
 * - **TAG**: Refers to a tag of the `Asset`.
 * - **METADATA_VALUE**: Refers to a value of a custom `MetadataField` of an `Asset`.
 * - **CUSTOM_METADATA_VALUE**: Refers to a value of a `CustomMetadata` of an `Asset`.
 * - **EXTERNAL_ID**: Refers to the `externalId` assigned to the `Asset`.
 * - **FILE_EXTENSION**: Refers to the file extension of an `Asset`.
 */
export enum ConditionType {
    CustomMetadataValue = 'CUSTOM_METADATA_VALUE',
    ExternalId = 'EXTERNAL_ID',
    FileExtension = 'FILE_EXTENSION',
    MetadataValue = 'METADATA_VALUE',
    Tag = 'TAG',
}

export type Copyright = {
    __typename?: 'Copyright';
    /** Asset `copyright` notice. */
    notice?: Maybe<Scalars['String']['output']>;
    /** Asset `copyright` status. */
    status: CopyrightStatus;
};

/** List of possible asset `copyright` status. */
export enum CopyrightStatus {
    Copyrighted = 'COPYRIGHTED',
    Public = 'PUBLIC',
    Unknown = 'UNKNOWN',
}

export type CreateAsset = {
    __typename?: 'CreateAsset';
    /** The newly created `Asset` processing job response. */
    job: AssetProcessingJob;
};

export type CreateAssetComment = {
    __typename?: 'CreateAssetComment';
    /** `AssetComment` details. */
    comment: AssetComment;
};

export type CreateAssetCommentInput = {
    /** Id of the `Asset` where you wish to create a new `AssetComment`. */
    assetId: Scalars['ID']['input'];
    /** `AssetComment` content. Can include `User` mentions by wrapping an authorized `Project` `User` Id in the form of `@[user:<id>]` where `<id>` is the `User` integer or global identifier. */
    content: Scalars['String']['input'];
    /** Add a `Marking` (highlighted area) to the new `AssetComment`. */
    marking?: InputMaybe<MarkingInput>;
};

export type CreateAssetInput = {
    /** Represents the Author of the `Asset`. Example: Photographer Name */
    author?: InputMaybe<Scalars['String']['input']>;
    /** Add `Asset` copyright details. */
    copyright?: InputMaybe<CreateCopyrightInput>;
    /** `Asset` description. */
    description?: InputMaybe<Scalars['String']['input']>;
    /** An array of strings representing the directory, if a folder does not exist, it is created. Example: ["My Folder", "Sub-Folder"] will create the necessary folders if they do not yet exist and place the `Asset` in it. **Important:** Cannot be used in conjunction with `parentId` that is from a `Folder`. */
    directory?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    /** Expiry Date. `Asset` will expire once the defined date is reached. */
    expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
    /** `Asset` external Id. */
    externalId?: InputMaybe<Scalars['ID']['input']>;
    /** File Id. Signed Id returned in `uploadFile`. */
    fileId: Scalars['ID']['input'];
    /** The parent Id, where the `Asset` should be located in. Should either be a `Library`, `WorkspaceProject` or `Folder` Id. **Important:** Cannot be used in conjunction with `directory` if the Id is from a `Folder`. */
    parentId?: InputMaybe<Scalars['ID']['input']>;
    /** **DEPRECATED** `Library` or `Workspace` Id. This value is ignored if `parentId` is set. This field will be removed. Use `parentId` instead. | Date: 2023-07-01T00:00:00.000+00:00 */
    projectId?: InputMaybe<Scalars['ID']['input']>;
    /** Skip file's EXIF metadata. When true, it will ignore all file metadata contents. */
    skipFileMetadata?: InputMaybe<Scalars['Boolean']['input']>;
    /** List of tags to create with `Asset` */
    tags?: InputMaybe<Array<InputMaybe<TagInput>>>;
    /** `Asset` title or display name. */
    title: Scalars['String']['input'];
    /** **DEPRECATED** `Asset` workflow status. Workflow logic will be automatically managed if not properly set. This field will be removed. | Date: 2022-07-01T00:00:00.000+00:00 */
    workflowStatus?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAttachment = {
    __typename?: 'CreateAttachment';
    /** The newly created `Attachment` processing job response. */
    job: AttachmentProcessingJob;
};

export type CreateAttachmentInput = {
    /** Attachment external Id. */
    externalId?: InputMaybe<Scalars['ID']['input']>;
    /** File Id. Signed Id returned in `uploadFile`. */
    fileId: Scalars['ID']['input'];
    /** Attachment name or display name. */
    name: Scalars['String']['input'];
    /** Parent Id. */
    parentId: Scalars['ID']['input'];
};

export type CreateCollection = {
    __typename?: 'CreateCollection';
    /** The newly created `Collection` details. */
    collection: Collection;
};

export type CreateCollectionInput = {
    /** Name of the `Collection`. */
    name: Scalars['String']['input'];
    /** Id of the parent where you wish to create a new `Collection`. Currently supported for `Library` type parent entities only. */
    parentId: Scalars['ID']['input'];
};

export type CreateCopyrightInput = {
    /** `Asset` copyright notice. Supports medium text length. */
    notice?: InputMaybe<Scalars['String']['input']>;
    /** `Asset` copyright status. */
    status?: CopyrightStatus;
};

export type CreateCustomMetadataProperty = {
    __typename?: 'CreateCustomMetadataProperty';
    /** The newly created `CustomMetadataProperty`. */
    property: CustomMetadataProperty;
};

export type CreateCustomMetadataPropertyInput = {
    /** Set a `CustomMetadataProperty` default value. This setting will be ignored for properties that are not of `SELECT` or `MULTISELECT` type  (use options for these cases instead). Applies to newly uploaded `Assets` only. */
    defaultValue?: InputMaybe<Scalars['String']['input']>;
    /** `CustomMetadataProperty` help text. */
    helpText?: InputMaybe<Scalars['String']['input']>;
    /** Define if `CustomMetadataProperty` is required. */
    isRequired?: InputMaybe<Scalars['Boolean']['input']>;
    /** `CustomMetadataProperty` display name. */
    name: Scalars['String']['input'];
    /** `CustomMetadataProperty` parent Id. */
    parentId: Scalars['ID']['input'];
    /** Position in the list of newly created `CustomMetadataProperty`. */
    position?: InputMaybe<CustomMetadataPropertyPositionInput>;
    /** `CustomMetadataProperty` type. */
    type: CreateCustomMetadataPropertyTypeInput;
};

export type CreateCustomMetadataPropertyTypeInput = {
    /** `CustomMetadataProperty` type name. */
    name: CustomMetadataPropertyTypeName;
    /** Define CustomMetadataProperty` options for `SELECT` or `MULTISELECT` type properties. */
    options?: InputMaybe<Array<CreateCustomMetadataPropertyTypeOptionInput>>;
};

export type CreateCustomMetadataPropertyTypeOptionInput = {
    /** Define `CustomMetadataPropertyOption` as default. Applies to newly created `Assets` only. */
    isDefault?: InputMaybe<Scalars['Boolean']['input']>;
    /** `CustomMetadataPropertyOption` value. */
    value: Scalars['String']['input'];
};

export type CreateExternalAsset = {
    __typename?: 'CreateExternalAsset';
    /** The newly created `Asset` processing job response. */
    job: AssetProcessingJob;
};

export type CreateExternalAssetInput = {
    /** External `Asset` allow interactions. */
    allowInteractions?: InputMaybe<Scalars['Boolean']['input']>;
    /** Represents the Author of the External `Asset`. */
    author?: InputMaybe<Scalars['String']['input']>;
    /** External `Asset` copyright details. */
    copyright?: InputMaybe<CreateCopyrightInput>;
    /** External `Asset` description. */
    description?: InputMaybe<Scalars['String']['input']>;
    /** External `Asset` destination folder. Folders will be created if they don't exist. */
    directory?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
    /** Expiry Date. External `Asset` will expire once the defined date is reached. */
    expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
    /** External `Asset` external Id. */
    externalId?: InputMaybe<Scalars['ID']['input']>;
    /** External `Asset` fixed height. */
    height?: InputMaybe<Scalars['Int']['input']>;
    /** Destination `Project` Id. */
    projectId: Scalars['ID']['input'];
    /** External `Asset` title or display name. */
    title: Scalars['String']['input'];
    /** External `Asset` `Url`. */
    url: Scalars['Url']['input'];
    /** External `Asset` fixed width. */
    width?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateFolder = {
    __typename?: 'CreateFolder';
    /** The newly created `Folder`. */
    folder?: Maybe<Folder>;
};

export type CreateFolderInput = {
    /** `Folder` description. */
    description?: InputMaybe<Scalars['String']['input']>;
    /** `Folder` name. */
    name: Scalars['String']['input'];
    /** The parent Id of the `Folder` creation destination. Possible identifiers are `Library`/`Workspace` or `Folder`. */
    parentId: Scalars['ID']['input'];
};

export type CreateLicense = {
    __typename?: 'CreateLicense';
    /** `License` details. */
    license: License;
};

export type CreateLicenseInput = {
    /** Apply `License` to new assets by default. */
    addByDefault?: InputMaybe<Scalars['Boolean']['input']>;
    /** `License` terms. */
    license: Scalars['String']['input'];
    /** `Library` Id. */
    projectId: Scalars['ID']['input'];
    /** Require user to accept `License` terms before download. */
    requireConsensus?: InputMaybe<Scalars['Boolean']['input']>;
    /** `License` title. */
    title: Scalars['String']['input'];
};

export type CreateMetadataField = {
    __typename?: 'CreateMetadataField';
    /** Created `MetadataField`. */
    metadataField: MetadataField;
};

export type CreateMetadataFieldInput = {
    /** Allow an empty value as a valid `SELECT` type `Metadata Field` value. */
    allowEmptyValue?: InputMaybe<Scalars['Boolean']['input']>;
    /** Allow multiple values in `SELECT` type `Metadata Field`. */
    allowMultipleValues?: InputMaybe<Scalars['Boolean']['input']>;
    /** New custom metadata default value option. This value will be set to all new assets. */
    defaultValue?: InputMaybe<Scalars['String']['input']>;
    /** Allow users to edit `Metadata Field` values in the Frontify UI. */
    isEditable?: InputMaybe<Scalars['Boolean']['input']>;
    /** Allow users to search for `Metadata Field` values in the Frontify UI. */
    isSearchable?: InputMaybe<Scalars['Boolean']['input']>;
    /** Show/hide `Metadata Field` values in the Frontify UI. */
    isVisible?: InputMaybe<Scalars['Boolean']['input']>;
    /** Create custom metadata field label. */
    label: Scalars['String']['input'];
    /** `Project`/`Library` Id where metadata field should be created. */
    projectId: Scalars['ID']['input'];
    /** Create custom metadata field type. */
    type?: MetadataFieldType;
    /** Create custom metadata field allowed values. Only valid for `SELECT` type fields. */
    values?: InputMaybe<Array<InputMaybe<MetadataFieldValuesInput>>>;
};

export type CreateWorkspaceProject = {
    __typename?: 'CreateWorkspaceProject';
    /** `WorkspaceProject` details. */
    project: Workspace;
};

export type CreateWorkspaceProjectInput = {
    /** Id of the `Brand` where `Project` should be inserted. */
    brandId: Scalars['ID']['input'];
    /** `Workspace` type `Project` name. */
    name: Scalars['String']['input'];
};

/** `CustomMetadataInterface` for `CustomMetadata` returnable types. */
export type CustomMetadata = {
    /** `CustomMetadataProperty` details. */
    property: CustomMetadataProperty;
};

export type CustomMetadataInput = {
    /** `CustomMetadataProperty` Id. */
    propertyId: Scalars['ID']['input'];
    /** `CustomMetadataProperty` value. */
    value?: InputMaybe<Scalars['Any']['input']>;
};

export type CustomMetadataProperty = {
    __typename?: 'CustomMetadataProperty';
    /** `DateTime` of the `CustomMetadataProperty` creation. */
    createdAt: Scalars['DateTime']['output'];
    /** `User` who created the `CustomMetadataProperty`. */
    creator: User;
    /** `CustomMetadataProperty` value set to newly update `Assets` by default. */
    defaultValue?: Maybe<Scalars['Any']['output']>;
    /** `CustomMetadataProperty` help text. */
    helpText?: Maybe<Scalars['String']['output']>;
    /** `CustomMetadataProperty` Id. */
    id: Scalars['ID']['output'];
    /** Indicates if a `CustomMetadataProperty` is required to be defined. */
    isRequired: Scalars['Boolean']['output'];
    /** `DateTime` of the `CustomMetadataProperty`'s last modification. */
    modifiedAt?: Maybe<Scalars['DateTime']['output']>;
    /** `User` who last modified the `CustomMetadataProperty`. */
    modifier?: Maybe<User>;
    /** `CustomMetadataProperty` name. */
    name: Scalars['String']['output'];
    /** `CustomMetadataProperty` type details. */
    type: CustomMetadataPropertyType;
};

export type CustomMetadataPropertyDateValueType = CustomMetadataPropertyValueType & {
    __typename?: 'CustomMetadataPropertyDateValueType';
    /** `CustomMetadataPropertyValueType` property type. */
    propertyType: Scalars['String']['output'];
};

/** `CustomMetadataPropertyDependencyInterface` for `CustomMetadataPropertyDependency` returnable types. */
export type CustomMetadataPropertyDependency = {
    /** The dependee `CustomMetadataProperty` Id. */
    propertyId: Scalars['ID']['output'];
    /** The `CustomMetadataPropertyDependency` type. */
    type: Scalars['String']['output'];
};

export type CustomMetadataPropertyLongTextValueType = CustomMetadataPropertyValueType & {
    __typename?: 'CustomMetadataPropertyLongTextValueType';
    /** `CustomMetadataPropertyValueType` property type. */
    propertyType: Scalars['String']['output'];
};

export type CustomMetadataPropertyMultiSelectValueType = CustomMetadataPropertyValueType & {
    __typename?: 'CustomMetadataPropertyMultiSelectValueType';
    /** `MultiSelectPropertyValueType` options. */
    options: Array<Maybe<CustomMetadataPropertyOption>>;
    /** `CustomMetadataPropertyValueType` property type. */
    propertyType: Scalars['String']['output'];
};

export type CustomMetadataPropertyNumberValueType = CustomMetadataPropertyValueType & {
    __typename?: 'CustomMetadataPropertyNumberValueType';
    /** `CustomMetadataPropertyValueType` property type. */
    propertyType: Scalars['String']['output'];
};

export type CustomMetadataPropertyOption = {
    __typename?: 'CustomMetadataPropertyOption';
    /** `CustomMetadataPropertyOption` Id. */
    id: Scalars['ID']['output'];
    /** Indicates if a `CustomMetadataPropertyOption` value is set to newly updated `Assets` by default. */
    isDefault: Scalars['Boolean']['output'];
    /** `CustomMetadataPropertyOption` value. */
    value: Scalars['String']['output'];
};

export type CustomMetadataPropertyPositionInput = {
    /** `CustomMetadataProperty` position placement. */
    placement: CustomMetadataPropertyPositionPlacement;
    /** `CustomMetadataProperty` Id used as positional reference for `BEFORE` and `AFTER` placements. */
    targetId?: InputMaybe<Scalars['ID']['input']>;
};

/** List of possible `CustomMetadataProperty` position placement options. */
export enum CustomMetadataPropertyPositionPlacement {
    After = 'AFTER',
    Before = 'BEFORE',
    First = 'FIRST',
    Last = 'LAST',
}

export type CustomMetadataPropertySelectValueType = CustomMetadataPropertyValueType & {
    __typename?: 'CustomMetadataPropertySelectValueType';
    /** `SelectPropertyValueType` options. */
    options: Array<Maybe<CustomMetadataPropertyOption>>;
    /** `CustomMetadataPropertyValueType` property type. */
    propertyType: Scalars['String']['output'];
};

export type CustomMetadataPropertySelectValueTypeDependencyTypeEquals = CustomMetadataPropertyDependency & {
    __typename?: 'CustomMetadataPropertySelectValueTypeDependencyTypeEquals';
    /** The dependee `CustomMetadataProperty` Id. */
    propertyId: Scalars['ID']['output'];
    /** `CustomMetadataPropertyOption` Id. */
    propertyOptionId: Scalars['ID']['output'];
    /** `CustomMetadataPropertyDependency` type. */
    type: Scalars['String']['output'];
};

export type CustomMetadataPropertySelectValueTypeDependencyTypeOneOf = CustomMetadataPropertyDependency & {
    __typename?: 'CustomMetadataPropertySelectValueTypeDependencyTypeOneOf';
    /** The dependee `CustomMetadataProperty` Id. */
    propertyId: Scalars['ID']['output'];
    /** `CustomMetadataPropertyOption` property option ids. */
    propertyOptionIds: Array<Maybe<Scalars['ID']['output']>>;
    /** `CustomMetadataPropertyDependency` type. */
    type: Scalars['String']['output'];
};

export type CustomMetadataPropertyTextValueType = CustomMetadataPropertyValueType & {
    __typename?: 'CustomMetadataPropertyTextValueType';
    /** `CustomMetadataPropertyValueType` property type. */
    propertyType: Scalars['String']['output'];
};

/** `CustomMetadataPropertyTypeInterface` for `CustomMetadataPropertyType` returnable types. */
export type CustomMetadataPropertyType = {
    /** The `CustomMetadataProperty` type name. */
    name: Scalars['String']['output'];
};

export type CustomMetadataPropertyTypeDate = CustomMetadataPropertyType & {
    __typename?: 'CustomMetadataPropertyTypeDate';
    /** The `CustomMetadataProperty` type name. */
    name: Scalars['String']['output'];
};

export type CustomMetadataPropertyTypeLongText = CustomMetadataPropertyType & {
    __typename?: 'CustomMetadataPropertyTypeLongText';
    /** The `CustomMetadataProperty` type name. */
    name: Scalars['String']['output'];
};

export type CustomMetadataPropertyTypeMultiSelect = CustomMetadataPropertyType & {
    __typename?: 'CustomMetadataPropertyTypeMultiSelect';
    /** The `CustomMetadataProperty` type name. */
    name: Scalars['String']['output'];
    /** `MULTISELECT` type `CustomMetadataProperty` options. */
    options: Array<Maybe<CustomMetadataPropertyOption>>;
};

/** List of possible `CustomMetadataProperty` type names. */
export enum CustomMetadataPropertyTypeName {
    Date = 'DATE',
    Longtext = 'LONGTEXT',
    Multiselect = 'MULTISELECT',
    Number = 'NUMBER',
    Select = 'SELECT',
    Text = 'TEXT',
    Url = 'URL',
}

export type CustomMetadataPropertyTypeNumber = CustomMetadataPropertyType & {
    __typename?: 'CustomMetadataPropertyTypeNumber';
    /** The `CustomMetadataProperty` type name. */
    name: Scalars['String']['output'];
};

export type CustomMetadataPropertyTypeSelect = CustomMetadataPropertyType & {
    __typename?: 'CustomMetadataPropertyTypeSelect';
    /** The `CustomMetadataProperty` type name. */
    name: Scalars['String']['output'];
    /** `SELECT` type `CustomMetadataProperty` options. */
    options: Array<Maybe<CustomMetadataPropertyOption>>;
};

export type CustomMetadataPropertyTypeText = CustomMetadataPropertyType & {
    __typename?: 'CustomMetadataPropertyTypeText';
    /** The `CustomMetadataProperty` type name. */
    name: Scalars['String']['output'];
};

export type CustomMetadataPropertyTypeUrl = CustomMetadataPropertyType & {
    __typename?: 'CustomMetadataPropertyTypeUrl';
    /** The `CustomMetadataProperty` type name. */
    name: Scalars['String']['output'];
};

export type CustomMetadataPropertyUrlValueType = CustomMetadataPropertyValueType & {
    __typename?: 'CustomMetadataPropertyUrlValueType';
    /** `CustomMetadataPropertyValueType` property type. */
    propertyType: Scalars['String']['output'];
};

/** `CustomMetadataPropertyValueTypeInterface` for `CustomMetadataPropertyValueType` returnable types. */
export type CustomMetadataPropertyValueType = {
    /** The `CustomMetadataPropertyValueType` property type. */
    propertyType: Scalars['String']['output'];
};

export type CustomMetadataPropertyValueTypeDependencyTypeFilled = CustomMetadataPropertyDependency & {
    __typename?: 'CustomMetadataPropertyValueTypeDependencyTypeFilled';
    /** The dependee `CustomMetadataProperty` Id. */
    propertyId: Scalars['ID']['output'];
    /** `CustomMetadataPropertyDependency` type. */
    type: Scalars['String']['output'];
};

export type CustomMetadataValue = CustomMetadata & {
    __typename?: 'CustomMetadataValue';
    /** `CustomMetadataProperty` details. */
    property: CustomMetadataProperty;
    /** `CustomMetadataProperty` value. Returns an object with `optionId` and `text` property values (for `SELECT` type only) or a string for other `CustomMetadataProperty` single value items. */
    value?: Maybe<Scalars['Any']['output']>;
};

export type CustomMetadataValues = CustomMetadata & {
    __typename?: 'CustomMetadataValues';
    /** `CustomMetadataProperty` details. */
    property: CustomMetadataProperty;
    /** `CustomMetadataProperty` values. Returns an empty list or a list of objects with `optionId` and `text` property values (for `MULTISELECT` type only). */
    values: Array<Maybe<Scalars['Any']['output']>>;
};

export type DeleteAsset = {
    __typename?: 'DeleteAsset';
    /**
     * **DEPRECATED** `Asset` details. This field will be removed. Use `id` instead. | Date: 2024-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `id` instead. | Date: 2024-01-01T00:00:00.000+00:00
     */
    asset: Asset;
    /** The Id of the deleted `Asset`. */
    id: Scalars['ID']['output'];
};

export type DeleteAssetInput = {
    /** Id of the `Asset` to delete. */
    id: Scalars['ID']['input'];
};

export type DeleteAttachment = {
    __typename?: 'DeleteAttachment';
    /**
     * **DEPRECATED** `Attachment` details. This field will be removed. Use `id` instead. | Date: 2024-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `id` instead. | Date: 2024-01-01T00:00:00.000+00:00
     */
    attachment: Attachment;
    /** The Id of the deleted `Attachment`. */
    id: Scalars['ID']['output'];
};

export type DeleteAttachmentInput = {
    /** Id of the `Attachment` to delete. */
    id: Scalars['ID']['input'];
};

export type DeleteCollection = {
    __typename?: 'DeleteCollection';
    /**
     * **DEPRECATED** `Collection` details. This field will be removed. Use `id` instead. | Date: 2024-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `id` instead. | Date: 2024-01-01T00:00:00.000+00:00
     */
    collection: Collection;
    /** The Id of the deleted `Collection`. */
    id: Scalars['ID']['output'];
};

export type DeleteCollectionInput = {
    /** `Collection` Id. */
    collectionId: Scalars['ID']['input'];
};

export type DeleteComment = {
    __typename?: 'DeleteComment';
    /**
     * **DEPRECATED** `Comment` details. This field will be removed. Use `id` instead. | Date: 2024-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `id` instead. | Date: 2024-01-01T00:00:00.000+00:00
     */
    comment: Comment;
    /** The Id of the deleted `Comment`. */
    id: Scalars['ID']['output'];
};

export type DeleteCommentInput = {
    /** Id of the `AssetComment` to delete. */
    id: Scalars['ID']['input'];
};

export type DeleteCustomMetadataProperty = {
    __typename?: 'DeleteCustomMetadataProperty';
    /** The Id of the deleted `CustomMetadataProperty`. */
    id: Scalars['ID']['output'];
};

export type DeleteCustomMetadataPropertyInput = {
    /** `CustomMetadataProperty` Id. */
    id: Scalars['ID']['input'];
};

export type DeleteFolders = {
    __typename?: 'DeleteFolders';
    /** List of the deleted `Folder` ids. */
    ids?: Maybe<Array<Scalars['ID']['output']>>;
};

export type DeleteFoldersInput = {
    /** Ids of the `Folders` to delete. */
    ids: Array<Scalars['ID']['input']>;
};

export type DeleteLicense = {
    __typename?: 'DeleteLicense';
    /** The Id of the deleted `License`. */
    id: Scalars['ID']['output'];
    /**
     * **DEPRECATED** `License` details. This field will be removed. Use `id` instead. | Date: 2024-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `id` instead. | Date: 2024-01-01T00:00:00.000+00:00
     */
    license: License;
};

export type DeleteLicenseInput = {
    /** Id of the `License` to delete. */
    id: Scalars['ID']['input'];
};

export type DeleteMetadataField = {
    __typename?: 'DeleteMetadataField';
    /** The Id of the deleted `MetadataField`. */
    id: Scalars['ID']['output'];
    /**
     * **DEPRECATED** Deleted `MetadataField`. This field will be removed. Use `id` instead. | Date: 2024-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `id` instead. | Date: 2024-01-01T00:00:00.000+00:00
     */
    metadataField: MetadataField;
};

export type DeleteMetadataFieldInput = {
    /** Id of the `MetadataField` to delete. */
    id: Scalars['ID']['input'];
};

export type Document = Asset &
    Node & {
        __typename?: 'Document';
        /** `Attachment` items linked to `Asset`. */
        attachments?: Maybe<Array<Maybe<AssetAttachment>>>;
        /** Represents the Author of the `Asset`. Example: Photographer Name. */
        author?: Maybe<Scalars['String']['output']>;
        /** Paginated list of `AssetComment` items for `Asset`. */
        comments?: Maybe<AssetCommentItems>;
        /** `Asset` copyright details. */
        copyright?: Maybe<Copyright>;
        /** `DateTime` of the `Asset` creation. */
        createdAt: Scalars['DateTime']['output'];
        /** The `User` who created the `Asset`. */
        creator: User;
        /** Current `User` `Asset` permissions. */
        currentUserPermissions: AssetUserPermissions;
        /** List of `CustomMetadataProperty` items and values associated to `Asset`. */
        customMetadata: Array<CustomMetadata>;
        /** Description of the `Asset`. */
        description?: Maybe<Scalars['String']['output']>;
        /** Signed `Url` to download the original `Document` type file. */
        downloadUrl?: Maybe<Scalars['Url']['output']>;
        /** `Asset` expiry date. */
        expiresAt?: Maybe<Scalars['DateTime']['output']>;
        /** Extension of the `Asset` `File`. */
        extension: Scalars['String']['output'];
        /** External Id of the `Asset`. */
        externalId?: Maybe<Scalars['ID']['output']>;
        /** `ExternalProduct` items linked to `Asset`. */
        externalProducts?: Maybe<Array<Maybe<ExternalProduct>>>;
        /** Original filename of the `Asset` `File`. */
        filename?: Maybe<Scalars['String']['output']>;
        /** `Document` focal point position. Example: `[0.4803, 0.4340]`. */
        focalPoint?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
        /** `Document` height in pixels. */
        height: Scalars['Int']['output'];
        /** `Asset` id. */
        id: Scalars['ID']['output'];
        /** `License` items linked to `Asset`. */
        licenses?: Maybe<Array<Maybe<License>>>;
        /**
         * **DEPRECATED** `MetadataValue` items linked to `Asset`. This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
         */
        metadataValues?: Maybe<Array<Maybe<MetadataValue>>>;
        /** `DateTime` of the `Asset` last modification. */
        modifiedAt?: Maybe<Scalars['DateTime']['output']>;
        /** The `User` who last modified the `Asset`. */
        modifier?: Maybe<User>;
        /** `Document` total number of pages. */
        pageCount?: Maybe<Scalars['Int']['output']>;
        /** Preview `Url` which has optional `width`, `height` and `page` arguments. If parameters are not specified, a `Url` without any parameters will be returned. */
        previewUrl: Scalars['Url']['output'];
        /** Paginated list of `Asset` items related to `Asset`. */
        relatedAssets: AssetItems;
        /** Size of the `Asset` `File` in bytes. */
        size?: Maybe<Scalars['BigInt']['output']>;
        /** Represents the conversion status of the `Asset`. Example: FINISHED. */
        status: AssetStatusType;
        /** List of `Tag` items linked to `Asset` */
        tags?: Maybe<Array<Maybe<Tag>>>;
        /** Title of the `Asset`. */
        title: Scalars['String']['output'];
        /** `Document` width in pixels. */
        width: Scalars['Int']['output'];
    };

export type DocumentCommentsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<AssetCommentQueryInput>;
};

export type DocumentDownloadUrlArgs = {
    permanent?: InputMaybe<Scalars['Boolean']['input']>;
    validityInDays?: InputMaybe<Scalars['Int']['input']>;
};

export type DocumentPreviewUrlArgs = {
    height?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    width?: InputMaybe<Scalars['Int']['input']>;
};

export type DocumentRelatedAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type DocumentLibrary = Library &
    Node & {
        __typename?: 'DocumentLibrary';
        /**
         * **DEPRECATED** Amount of `Assets` contained in the `Library`/`Workspace`. This field will be removed. Use `assets`.`total` instead. | Date: 2024-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `assets`.`total` instead. | Date: 2024-01-01T00:00:00.000+00:00
         */
        assetCount?: Maybe<Scalars['Int']['output']>;
        /** Search or list `Assets` in the `Library`/`Workspace`. */
        assets: AssetItems;
        /** Browse the `Library` `SubFolderItems` and `AssetItems`. */
        browse: LibraryRootFolder;
        /** `Library` collaborators. */
        collaborators?: Maybe<LibraryCollaborators>;
        /** `Library` `Collection` items list. */
        collections: CollectionItems;
        /** `Library`/`Workspace` color. */
        color?: Maybe<RgbaColor>;
        /** `Library` permissions of the current `User`. */
        currentUserPermissions: LibraryUserPermissions;
        /** Retrieve list of all `CustomMetadataProperty` items belonging to `Library`. */
        customMetadataProperties: Array<CustomMetadataProperty>;
        /** `Library`/`Workspace` Id. */
        id: Scalars['ID']['output'];
        /** `Library`/`Workspace` `License` items list. */
        licenses?: Maybe<Array<Maybe<License>>>;
        /**
         * **DEPRECATED** `Library`/`Workspace` `MetadataField` items list. This field will be removed. Use `customMetadataProperties` instead. | Date: 2025-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `customMetadataProperties` instead. | Date: 2025-01-01T00:00:00.000+00:00
         */
        metadataFields?: Maybe<Array<Maybe<MetadataField>>>;
        /** `Library`/`Workspace` name. */
        name: Scalars['String']['output'];
    };

export type DocumentLibraryAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<AssetQueryInput>;
};

export type DocumentLibraryCollectionsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type EditComment = {
    __typename?: 'EditComment';
    /** `Comment` details. */
    comment: Comment;
};

export type EditCommentInput = {
    /** `AssetComment` content to edit. Can include `User` mentions by wrapping an authorized `Project` `User` Id in the form of `@[user:<id>]` where `<id>` is the user identifier. */
    content: Scalars['String']['input'];
    /** `AssetComment` Id you wish to edit. */
    id: Scalars['ID']['input'];
};

export type EmbeddedContent = Asset &
    Node & {
        __typename?: 'EmbeddedContent';
        /** `Attachment` items linked to `Asset`. */
        attachments?: Maybe<Array<Maybe<AssetAttachment>>>;
        /** Represents the Author of the `Asset`. Example: Photographer Name. */
        author?: Maybe<Scalars['String']['output']>;
        /** Paginated list of `AssetComment` items for `Asset`. */
        comments?: Maybe<AssetCommentItems>;
        /** `Asset` copyright details. */
        copyright?: Maybe<Copyright>;
        /** `DateTime` of the `Asset` creation. */
        createdAt: Scalars['DateTime']['output'];
        /** The `User` who created the `Asset`. */
        creator: User;
        /** Current `User` `Asset` permissions. */
        currentUserPermissions: AssetUserPermissions;
        /** List of `CustomMetadataProperty` items and values associated to `Asset`. */
        customMetadata: Array<CustomMetadata>;
        /** Description of the `Asset`. */
        description?: Maybe<Scalars['String']['output']>;
        /** `Asset` expiry date. */
        expiresAt?: Maybe<Scalars['DateTime']['output']>;
        /** External Id of the `Asset`. */
        externalId?: Maybe<Scalars['ID']['output']>;
        /** `ExternalProduct` items linked to `Asset`. */
        externalProducts?: Maybe<Array<Maybe<ExternalProduct>>>;
        /** `Asset` id. */
        id: Scalars['ID']['output'];
        /** `License` items linked to `Asset`. */
        licenses?: Maybe<Array<Maybe<License>>>;
        /**
         * **DEPRECATED** `MetadataValue` items linked to `Asset`. This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
         */
        metadataValues?: Maybe<Array<Maybe<MetadataValue>>>;
        /** `DateTime` of the `Asset` last modification. */
        modifiedAt?: Maybe<Scalars['DateTime']['output']>;
        /** The `User` who last modified the `Asset`. */
        modifier?: Maybe<User>;
        /** Preview of the embedded content. If the preview is not available, an svg icon will be returned. */
        previewUrl: Scalars['Url']['output'];
        /** Paginated list of `Asset` items related to `Asset`. */
        relatedAssets: AssetItems;
        /** Represents the conversion status of the `Asset`. Example: FINISHED. */
        status: AssetStatusType;
        /** List of `Tag` items linked to `Asset` */
        tags?: Maybe<Array<Maybe<Tag>>>;
        /** Title of the `Asset`. */
        title: Scalars['String']['output'];
    };

export type EmbeddedContentCommentsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<AssetCommentQueryInput>;
};

export type EmbeddedContentRelatedAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type ExternalProduct = {
    __typename?: 'ExternalProduct';
    /** `External product` externalId. */
    externalId?: Maybe<Scalars['ID']['output']>;
    /** `External product` Id. */
    id: Scalars['ID']['output'];
    /** `External product` name. */
    name: Scalars['String']['output'];
    /** `External product` title. */
    title?: Maybe<Scalars['String']['output']>;
};

export type File = Asset &
    Node & {
        __typename?: 'File';
        /** `Attachment` items linked to `Asset`. */
        attachments?: Maybe<Array<Maybe<AssetAttachment>>>;
        /** Represents the Author of the `Asset`. Example: Photographer Name. */
        author?: Maybe<Scalars['String']['output']>;
        /** Paginated list of `AssetComment` items for `Asset`. */
        comments?: Maybe<AssetCommentItems>;
        /** `Asset` copyright details. */
        copyright?: Maybe<Copyright>;
        /** `DateTime` of the `Asset` creation. */
        createdAt: Scalars['DateTime']['output'];
        /** The `User` who created the `Asset`. */
        creator: User;
        /** Current `User` `Asset` permissions. */
        currentUserPermissions: AssetUserPermissions;
        /** List of `CustomMetadataProperty` items and values associated to `Asset`. */
        customMetadata: Array<CustomMetadata>;
        /** Description of the `Asset`. */
        description?: Maybe<Scalars['String']['output']>;
        /** Signed `Url` to download the original `File` type file. */
        downloadUrl?: Maybe<Scalars['Url']['output']>;
        /** `Asset` expiry date. */
        expiresAt?: Maybe<Scalars['DateTime']['output']>;
        /** Extension of the `Asset` `File`. */
        extension: Scalars['String']['output'];
        /** External Id of the `Asset`. */
        externalId?: Maybe<Scalars['ID']['output']>;
        /** `ExternalProduct` items linked to `Asset`. */
        externalProducts?: Maybe<Array<Maybe<ExternalProduct>>>;
        /** Original filename of the `Asset` `File`. */
        filename?: Maybe<Scalars['String']['output']>;
        /** `Asset` id. */
        id: Scalars['ID']['output'];
        /** `License` items linked to `Asset`. */
        licenses?: Maybe<Array<Maybe<License>>>;
        /**
         * **DEPRECATED** `MetadataValue` items linked to `Asset`. This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
         */
        metadataValues?: Maybe<Array<Maybe<MetadataValue>>>;
        /** `DateTime` of the `Asset` last modification. */
        modifiedAt?: Maybe<Scalars['DateTime']['output']>;
        /** The `User` who last modified the `Asset`. */
        modifier?: Maybe<User>;
        /** `File` type icon in `svg` format. */
        previewUrl: Scalars['Url']['output'];
        /** Paginated list of `Asset` items related to `Asset`. */
        relatedAssets: AssetItems;
        /** Size of the `Asset` `File` in bytes. */
        size?: Maybe<Scalars['BigInt']['output']>;
        /** Represents the conversion status of the `Asset`. Example: FINISHED. */
        status: AssetStatusType;
        /** List of `Tag` items linked to `Asset` */
        tags?: Maybe<Array<Maybe<Tag>>>;
        /** Title of the `Asset`. */
        title: Scalars['String']['output'];
    };

export type FileCommentsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<AssetCommentQueryInput>;
};

export type FileDownloadUrlArgs = {
    permanent?: InputMaybe<Scalars['Boolean']['input']>;
    validityInDays?: InputMaybe<Scalars['Int']['input']>;
};

export type FileRelatedAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

/** `FolderInterface` for `Folder` returnable types. */
export type Folder = {
    /** The `AssetItems` in the current `Library`/`Workspace`/`Folder`. */
    assets: AssetItems;
    /** A list of `Breadcrumb` items representing the parent folders structure for the current `SubFolder`. */
    breadcrumbs: Array<Breadcrumb>;
    /** `DateTime` of the `Folder` creation. */
    createdAt: Scalars['DateTime']['output'];
    /** The `User` who created the `Folder`. */
    creator: User;
    /** The `FolderItems` of the current `Library`/`Workspace`/`Folder`. */
    folders: FolderItems;
    /** `Folder` Id. */
    id: Scalars['ID']['output'];
    /** `DateTime` of the last `Folder` modification. */
    modifiedAt?: Maybe<Scalars['DateTime']['output']>;
    /** The `User` who last modified the `Folder`. */
    modifier?: Maybe<User>;
    /** `Folder` name. */
    name: Scalars['String']['output'];
    /**
     * **DEPRECATED** The `SubFolderItems` of the current `Library`/`Workspace`/`SubFolder`. This field will be removed. Use `folders` instead. | Date: 2024-07-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `folders` instead. | Date: 2024-07-01T00:00:00.000+00:00
     */
    subFolders: SubFolderItems;
};

/** `FolderInterface` for `Folder` returnable types. */
export type FolderAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

/** `FolderInterface` for `Folder` returnable types. */
export type FolderFoldersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

/** `FolderInterface` for `Folder` returnable types. */
export type FolderSubFoldersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type FolderItems = {
    __typename?: 'FolderItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** List of type `Folder` */
    items?: Maybe<Array<Maybe<Folder>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type Guideline = Node & {
    __typename?: 'Guideline';
    /** `Guideline` color. */
    color?: Maybe<RgbaColor>;
    /** `Guideline` Id. */
    id: Scalars['ID']['output'];
    /** Paginated list of `LibraryPage` items for `Guideline`. */
    libraryPages: LibraryPageItems;
    /** `Guideline` name. */
    name?: Maybe<Scalars['String']['output']>;
    /** `Guideline` internal url. */
    url: Scalars['Url']['output'];
};

export type GuidelineLibraryPagesArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type IconLibrary = Library &
    Node & {
        __typename?: 'IconLibrary';
        /**
         * **DEPRECATED** Amount of `Assets` contained in the `Library`/`Workspace`. This field will be removed. Use `assets`.`total` instead. | Date: 2024-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `assets`.`total` instead. | Date: 2024-01-01T00:00:00.000+00:00
         */
        assetCount?: Maybe<Scalars['Int']['output']>;
        /** Search or list `Assets` in the `Library`/`Workspace`. */
        assets: AssetItems;
        /** Browse the `Library` `SubFolderItems` and `AssetItems`. */
        browse: LibraryRootFolder;
        /** `Library` collaborators. */
        collaborators?: Maybe<LibraryCollaborators>;
        /** `Library` `Collection` items list. */
        collections: CollectionItems;
        /** `Library`/`Workspace` color. */
        color?: Maybe<RgbaColor>;
        /** `Library` permissions of the current `User`. */
        currentUserPermissions: LibraryUserPermissions;
        /** Retrieve list of all `CustomMetadataProperty` items belonging to `Library`. */
        customMetadataProperties: Array<CustomMetadataProperty>;
        /** `Library`/`Workspace` Id. */
        id: Scalars['ID']['output'];
        /** `Library`/`Workspace` `License` items list. */
        licenses?: Maybe<Array<Maybe<License>>>;
        /**
         * **DEPRECATED** `Library`/`Workspace` `MetadataField` items list. This field will be removed. Use `customMetadataProperties` instead. | Date: 2025-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `customMetadataProperties` instead. | Date: 2025-01-01T00:00:00.000+00:00
         */
        metadataFields?: Maybe<Array<Maybe<MetadataField>>>;
        /** `Library`/`Workspace` name. */
        name: Scalars['String']['output'];
    };

export type IconLibraryAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<AssetQueryInput>;
};

export type IconLibraryCollectionsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type Image = Asset &
    Node & {
        __typename?: 'Image';
        /** `Attachment` items linked to `Asset`. */
        attachments?: Maybe<Array<Maybe<AssetAttachment>>>;
        /** Represents the Author of the `Asset`. Example: Photographer Name. */
        author?: Maybe<Scalars['String']['output']>;
        /** Paginated list of `AssetComment` items for `Asset`. */
        comments?: Maybe<AssetCommentItems>;
        /** `Asset` copyright details. */
        copyright?: Maybe<Copyright>;
        /** `DateTime` of the `Asset` creation. */
        createdAt: Scalars['DateTime']['output'];
        /** The `User` who created the `Asset`. */
        creator: User;
        /** Current `User` `Asset` permissions. */
        currentUserPermissions: AssetUserPermissions;
        /** List of `CustomMetadataProperty` items and values associated to `Asset`. */
        customMetadata: Array<CustomMetadata>;
        /** Description of the `Asset`. */
        description?: Maybe<Scalars['String']['output']>;
        /** Signed `Url` to download the original `Image` type file. */
        downloadUrl?: Maybe<Scalars['Url']['output']>;
        /** `Asset` expiry date. */
        expiresAt?: Maybe<Scalars['DateTime']['output']>;
        /** Extension of the `Asset` `File`. */
        extension: Scalars['String']['output'];
        /** External Id of the `Asset`. */
        externalId?: Maybe<Scalars['ID']['output']>;
        /** `ExternalProduct` items linked to `Asset`. */
        externalProducts?: Maybe<Array<Maybe<ExternalProduct>>>;
        /** Original filename of the `Asset` `File`. */
        filename?: Maybe<Scalars['String']['output']>;
        /** `Image` focal point position. Example: `[0.4803, 0.4340]`. */
        focalPoint?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
        /** `Image` height in pixels. */
        height: Scalars['Int']['output'];
        /** `Asset` id. */
        id: Scalars['ID']['output'];
        /** `License` items linked to `Asset`. */
        licenses?: Maybe<Array<Maybe<License>>>;
        /**
         * **DEPRECATED** `MetadataValue` items linked to `Asset`. This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
         */
        metadataValues?: Maybe<Array<Maybe<MetadataValue>>>;
        /** `DateTime` of the `Asset` last modification. */
        modifiedAt?: Maybe<Scalars['DateTime']['output']>;
        /** The `User` who last modified the `Asset`. */
        modifier?: Maybe<User>;
        /** Preview `Url` which has optional `width` and `height` URL parameters. If parameters are not specified, `Url` without any URL parameters will be returned. */
        previewUrl: Scalars['Url']['output'];
        /** Paginated list of `Asset` items related to `Asset`. */
        relatedAssets: AssetItems;
        /** Size of the `Asset` `File` in bytes. */
        size?: Maybe<Scalars['BigInt']['output']>;
        /** Represents the conversion status of the `Asset`. Example: FINISHED. */
        status: AssetStatusType;
        /** List of `Tag` items linked to `Asset` */
        tags?: Maybe<Array<Maybe<Tag>>>;
        /** Title of the `Asset`. */
        title: Scalars['String']['output'];
        /** `Image` width in pixels. */
        width: Scalars['Int']['output'];
    };

export type ImageCommentsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<AssetCommentQueryInput>;
};

export type ImageDownloadUrlArgs = {
    permanent?: InputMaybe<Scalars['Boolean']['input']>;
    validityInDays?: InputMaybe<Scalars['Int']['input']>;
};

export type ImagePreviewUrlArgs = {
    height?: InputMaybe<Scalars['Int']['input']>;
    width?: InputMaybe<Scalars['Int']['input']>;
};

export type ImageRelatedAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type InstallProjectWebhook = {
    __typename?: 'InstallProjectWebhook';
    /** `Webhook` details. */
    webhook: Webhook;
};

export type InstallProjectWebhookInput = {
    /** `ProjectWebhook` name. */
    name: Scalars['String']['input'];
    /** `Url` to send the `ProjectWebhook` notification to. */
    notificationUrl: Scalars['Url']['input'];
    /** Destination `Project` Id. */
    projectId: Scalars['ID']['input'];
};

export type InviteProjectUser = {
    __typename?: 'InviteProjectUser';
    /** `Project` where `User` was invited to. */
    project?: Maybe<Project>;
};

export type InviteProjectUserInput = {
    /** Email address of the `User` you would like to invite. */
    email: Scalars['Email']['input'];
    /** `Project` permission level of the `User` you are inviting. */
    permission?: ProjectPermission;
    /** Id of the `Project` you want to invite `User` to. */
    projectId: Scalars['ID']['input'];
    /** Start `Date` for `User` access permission validity. */
    validFrom?: InputMaybe<Scalars['DateTime']['input']>;
    /** End `Date` for `User` access permission validity. */
    validTo?: InputMaybe<Scalars['DateTime']['input']>;
};

/** `LibraryInterface` for `Library` returnable types. */
export type Library = {
    /**
     * **DEPRECATED** Amount of `Assets` contained in this `Library`. This field will be removed. Use `assets`.`total` instead. | Date: 2024-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `assets`.`total` instead. | Date: 2024-01-01T00:00:00.000+00:00
     */
    assetCount?: Maybe<Scalars['Int']['output']>;
    /** Search or list `Assets` in this `Library`. */
    assets: AssetItems;
    /** Browse the `Library`'s `SubFolderItems` and `AssetItems`. */
    browse: LibraryRootFolder;
    /** `Library` collaborators. */
    collaborators?: Maybe<LibraryCollaborators>;
    /** List `Collection` type items within a `Library`. */
    collections: CollectionItems;
    /** `Library` color. */
    color?: Maybe<RgbaColor>;
    /** Check current `User` permissions in a specific `Library`. */
    currentUserPermissions: LibraryUserPermissions;
    /** List of `CustomMetadataProperty` items belonging to a `Library`. */
    customMetadataProperties: Array<CustomMetadataProperty>;
    /** `Library` Id. */
    id: Scalars['ID']['output'];
    /** Retrieve list of all `Licenses` belonging to this `Library`. */
    licenses?: Maybe<Array<Maybe<License>>>;
    /**
     * **DEPRECATED** Retrieve list of all `MetadataFields` belonging to this `Library`. This field will be removed. Use `customMetadataProperties` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `customMetadataProperties` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    metadataFields?: Maybe<Array<Maybe<MetadataField>>>;
    /** `Library` name. */
    name: Scalars['String']['output'];
};

/** `LibraryInterface` for `Library` returnable types. */
export type LibraryAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<AssetQueryInput>;
};

/** `LibraryInterface` for `Library` returnable types. */
export type LibraryCollectionsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type LibraryCollaboratorUserItems = {
    __typename?: 'LibraryCollaboratorUserItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** List of `User` items that have lowest required permissions to collaborate on a `Library`. */
    items: Array<Maybe<User>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type LibraryCollaborators = {
    __typename?: 'LibraryCollaborators';
    /** `LibraryCollaboratorUserItems` list. */
    users: LibraryCollaboratorUserItems;
};

export type LibraryCollaboratorsUsersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type LibraryItems = {
    __typename?: 'LibraryItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** List of type `Library` */
    items?: Maybe<Array<Maybe<Library>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type LibraryPage = Node & {
    __typename?: 'LibraryPage';
    /** `LibraryPage` `Asset` items list. */
    assets: LibraryPageAssetItems;
    /** `LibraryPage` Id. */
    id: Scalars['ID']['output'];
    /** `LibraryPage` title. */
    title: Scalars['String']['output'];
    /** `LibraryPage` type. */
    type: LibraryType;
};

export type LibraryPageAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<LibraryPageAssetQueryInput>;
};

export type LibraryPageAssetItems = {
    __typename?: 'LibraryPageAssetItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** List of type `Asset`. */
    items?: Maybe<Array<Maybe<Asset>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type LibraryPageAssetQueryInput = {
    /** Search term used to retrieve matched results. */
    term?: InputMaybe<Scalars['String']['input']>;
};

export type LibraryPageItems = {
    __typename?: 'LibraryPageItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** List of type `LibraryPage`. */
    items?: Maybe<Array<Maybe<LibraryPage>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type LibraryRootFolder = {
    __typename?: 'LibraryRootFolder';
    /** `Library`/`Workspace`'s `AssetItems` list. */
    assets: AssetItems;
    /** The `FolderItems` of the current `Library`/`Workspace`. */
    folders: FolderItems;
    /**
     * **DEPRECATED** The `SubFolderItems` of the current `Library`/`Workspace`. This field will be removed. Use `folders` instead. | Date: 2024-07-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `folders` instead. | Date: 2024-07-01T00:00:00.000+00:00
     */
    subFolders: SubFolderItems;
};

export type LibraryRootFolderAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type LibraryRootFolderFoldersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type LibraryRootFolderSubFoldersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

/** List of possible `Library` types. */
export enum LibraryType {
    DocumentLibrary = 'DOCUMENT_LIBRARY',
    IconLibrary = 'ICON_LIBRARY',
    LogoLibrary = 'LOGO_LIBRARY',
    MediaLibrary = 'MEDIA_LIBRARY',
}

export type LibraryUserPermissions = {
    __typename?: 'LibraryUserPermissions';
    /** Check if current `User` has `Asset` creation permissions in a specific `Library`. */
    canCreateAssets: Scalars['Boolean']['output'];
    /** Check if current `User` has `Collection` creation permissions in a specific `Library`. */
    canCreateCollections: Scalars['Boolean']['output'];
    /** Check if current `User` has `Collaborator` view permissions in a specific `Library`. */
    canViewCollaborators: Scalars['Boolean']['output'];
};

export type License = {
    __typename?: 'License';
    /** `License` is applied to new assets by default. */
    addByDefault: Scalars['Boolean']['output'];
    /** `License` id. */
    id: Scalars['ID']['output'];
    /** `License` terms. */
    license: Scalars['String']['output'];
    /** `License` requires `User` to accept terms before download. */
    requireConsensus: Scalars['Boolean']['output'];
    /** `License` title. */
    title: Scalars['String']['output'];
};

export type LogoLibrary = Library &
    Node & {
        __typename?: 'LogoLibrary';
        /**
         * **DEPRECATED** Amount of `Assets` contained in the `Library`/`Workspace`. This field will be removed. Use `assets`.`total` instead. | Date: 2024-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `assets`.`total` instead. | Date: 2024-01-01T00:00:00.000+00:00
         */
        assetCount?: Maybe<Scalars['Int']['output']>;
        /** Search or list `Assets` in the `Library`/`Workspace`. */
        assets: AssetItems;
        /** Browse the `Library` `SubFolderItems` and `AssetItems`. */
        browse: LibraryRootFolder;
        /** `Library` collaborators. */
        collaborators?: Maybe<LibraryCollaborators>;
        /** `Library` `Collection` items list. */
        collections: CollectionItems;
        /** `Library`/`Workspace` color. */
        color?: Maybe<RgbaColor>;
        /** `Library` permissions of the current `User`. */
        currentUserPermissions: LibraryUserPermissions;
        /** Retrieve list of all `CustomMetadataProperty` items belonging to `Library`. */
        customMetadataProperties: Array<CustomMetadataProperty>;
        /** `Library`/`Workspace` Id. */
        id: Scalars['ID']['output'];
        /** `Library`/`Workspace` `License` items list. */
        licenses?: Maybe<Array<Maybe<License>>>;
        /**
         * **DEPRECATED** `Library`/`Workspace` `MetadataField` items list. This field will be removed. Use `customMetadataProperties` instead. | Date: 2025-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `customMetadataProperties` instead. | Date: 2025-01-01T00:00:00.000+00:00
         */
        metadataFields?: Maybe<Array<Maybe<MetadataField>>>;
        /** `Library`/`Workspace` name. */
        name: Scalars['String']['output'];
    };

export type LogoLibraryAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<AssetQueryInput>;
};

export type LogoLibraryCollectionsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

/** Interface representing a visual `Marking` (highlighted point/area) of an `Asset`. */
export type Marking = {
    /** The `Marking` dimensions in percentage relative to the annotated subject size. */
    dimensions?: Maybe<MarkingDimensions>;
    /** The `Marking` position in percentage relative to the top left corner of the annotated subject. */
    position: MarkingPosition;
};

export type MarkingDimensions = {
    __typename?: 'MarkingDimensions';
    /** The height of the `Marking` area in percentage of the annotated subject total height, relative to the top left corner. */
    height?: Maybe<Scalars['Percent']['output']>;
    /** The width of the `Marking` area in percentage of the annotated subject total width, relative to the top left corner. */
    width?: Maybe<Scalars['Percent']['output']>;
};

export type MarkingDimensionsInput = {
    /** The height of the `Marking` area in percentage of the annotated subject total height. */
    height: Scalars['Percent']['input'];
    /** The width of the `Marking` area in percentage of the annotated subject total width. */
    width: Scalars['Percent']['input'];
};

export type MarkingInput = {
    /** The `Marking` dimensions in percentage of the annotated subject dimensions. */
    dimensions?: InputMaybe<MarkingDimensionsInput>;
    /** The `Marking` page. Applicable to `Assets` with the type `Document` only. */
    page?: InputMaybe<Scalars['Int']['input']>;
    /** The `Marking` position in percentage, in relation to the top left corner of the `Asset`. */
    position?: InputMaybe<MarkingPositionInput>;
    /** The timeframe of the `Marking` area in percentage of total video length. Applicable to `Video` type `Assets` only. */
    timeframe?: InputMaybe<MarkingTimeframeInput>;
};

export type MarkingPosition = {
    __typename?: 'MarkingPosition';
    /** The horizontal position of the `Marking` in percentage, in relation to the `Asset` total width. */
    x: Scalars['Percent']['output'];
    /** The vertical position of the `Marking` in percentage, in relation to the `Asset` total height. */
    y: Scalars['Percent']['output'];
};

export type MarkingPositionInput = {
    /** The horizontal position of the `Marking` in percentage, in relation to the `Asset` top left corner. */
    x: Scalars['Percent']['input'];
    /** The vertical position of the `Marking` in percentage, in relation to the `Asset` top left corner. */
    y: Scalars['Percent']['input'];
};

export type MarkingTimeframe = {
    __typename?: 'MarkingTimeframe';
    /** The end of the `Marking` area in percentage of total video length. */
    end?: Maybe<Scalars['Percent']['output']>;
    /** The start of the `Marking` area in percentage of total video length. */
    start?: Maybe<Scalars['Percent']['output']>;
};

export type MarkingTimeframeInput = {
    /** The end of the `Marking` area in percentage of total video length. Defaults to video end (1) when the timeframe input property is set. */
    end?: InputMaybe<Scalars['Percent']['input']>;
    /** The start of the `Marking` area in percentage of total video length. Defaults to video start (0) when the timeframe input property is set. */
    start?: InputMaybe<Scalars['Percent']['input']>;
};

export type MediaLibrary = Library &
    Node & {
        __typename?: 'MediaLibrary';
        /**
         * **DEPRECATED** Amount of `Assets` contained in the `Library`/`Workspace`. This field will be removed. Use `assets`.`total` instead. | Date: 2024-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `assets`.`total` instead. | Date: 2024-01-01T00:00:00.000+00:00
         */
        assetCount?: Maybe<Scalars['Int']['output']>;
        /** Search or list `Assets` in the `Library`/`Workspace`. */
        assets: AssetItems;
        /** Browse the `Library` `SubFolderItems` and `AssetItems`. */
        browse: LibraryRootFolder;
        /** `Library` collaborators. */
        collaborators?: Maybe<LibraryCollaborators>;
        /** `Library` `Collection` items list. */
        collections: CollectionItems;
        /** `Library`/`Workspace` color. */
        color?: Maybe<RgbaColor>;
        /** `Library` permissions of the current `User`. */
        currentUserPermissions: LibraryUserPermissions;
        /** Retrieve list of all `CustomMetadataProperty` items belonging to `Library`. */
        customMetadataProperties: Array<CustomMetadataProperty>;
        /** `Library`/`Workspace` Id. */
        id: Scalars['ID']['output'];
        /** `Library`/`Workspace` `License` items list. */
        licenses?: Maybe<Array<Maybe<License>>>;
        /**
         * **DEPRECATED** `Library`/`Workspace` `MetadataField` items list. This field will be removed. Use `customMetadataProperties` instead. | Date: 2025-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `customMetadataProperties` instead. | Date: 2025-01-01T00:00:00.000+00:00
         */
        metadataFields?: Maybe<Array<Maybe<MetadataField>>>;
        /** `Library`/`Workspace` name. */
        name: Scalars['String']['output'];
    };

export type MediaLibraryAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<AssetQueryInput>;
};

export type MediaLibraryCollectionsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type MetadataField = {
    __typename?: 'MetadataField';
    /**
     * **DEPRECATED** Allow an empty value as a valid `SELECT` type `MetadataField` value. This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     */
    allowEmptyValue: Scalars['Boolean']['output'];
    /**
     * **DEPRECATED** Allow multiple values in `SELECT` type `MetadataField`. This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     */
    allowMultipleValues: Scalars['Boolean']['output'];
    /**
     * **DEPRECATED** `DateTime` of the `MetadataField` creation. This field will be removed. Use `CustomMetadataProperty.createdAt` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataProperty.createdAt` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    createdAt: Scalars['DateTime']['output'];
    /**
     * **DEPRECATED** `User` who created the `MetadataField`. This field will be removed. Use `CustomMetadataProperty.creator` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataProperty.creator` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    creator: User;
    /**
     * **DEPRECATED** Optional default value of the `MetadataField`. This field will be removed. Use `CustomMetadataProperty.defaultValue` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataProperty.defaultValue` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    defaultValue?: Maybe<Scalars['String']['output']>;
    /**
     * **DEPRECATED** `MetadataField` Id. This field will be removed. Use `CustomMetadataProperty.id` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataProperty.id` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    id: Scalars['ID']['output'];
    /**
     * **DEPRECATED** Allow users to edit `MetadataField` values. This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     */
    isEditable: Scalars['Boolean']['output'];
    /**
     * **DEPRECATED** Allow users to search for `MetadataField` values. This field will be removed. Use `CustomMetadataProperty.isSearchable` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataProperty.isSearchable` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    isSearchable: Scalars['Boolean']['output'];
    /**
     * **DEPRECATED** Show/hide `MetadataField` values. This field will be removed. Use `CustomMetadataProperty.isViewable` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataProperty.isViewable` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    isVisible: Scalars['Boolean']['output'];
    /**
     * **DEPRECATED** `MetadataField`'s name. This field will be removed. Use `CustomMetadataProperty.name` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataProperty.name` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    label: Scalars['String']['output'];
    /**
     * **DEPRECATED** `DateTime` of the `MetadataField`'s last modification. This field will be removed. Use `CustomMetadataProperty.modifiedAt` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataProperty.modifiedAt` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    modifiedAt?: Maybe<Scalars['DateTime']['output']>;
    /**
     * **DEPRECATED** `User` who last modified `MetadataField`. This field will be removed. Use `CustomMetadataProperty.modifier` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataProperty.modifier` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    modifier?: Maybe<User>;
    /**
     * **DEPRECATED** `MetadataField`'s type. This field will be removed. Use `CustomMetadataProperty.type.name` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataProperty.type.name` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    type: Scalars['String']['output'];
    /**
     * **DEPRECATED** Possible values for `SELECT` type `MetadataField`. This field will be removed. Use `CustomMetadataProperty.type.options` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataProperty.type.options` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    values?: Maybe<Array<Maybe<MetadataFieldValues>>>;
};

/** List of possible custom `MetadataField` types. */
export enum MetadataFieldType {
    Date = 'DATE',
    Longtext = 'LONGTEXT',
    Number = 'NUMBER',
    Select = 'SELECT',
    Text = 'TEXT',
}

export type MetadataFieldValues = {
    __typename?: 'MetadataFieldValues';
    /**
     * **DEPRECATED** Default value for `SELECT` type `Metadata Field`. This field will be removed. Use `CustomMetadataProperty.type.options.isDefault` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataProperty.type.options.isDefault` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    default?: Maybe<Scalars['Boolean']['output']>;
    /**
     * **DEPRECATED** Value of `SELECT` type `Metadata Field`. This field will be removed. Use `CustomMetadataProperty.type.options.value` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataProperty.type.options.value` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    value?: Maybe<Scalars['String']['output']>;
};

export type MetadataFieldValuesInput = {
    /** Optional setting to define current `SELECT` type `Metadata Field` value as default. */
    default?: InputMaybe<Scalars['Boolean']['input']>;
    /** Possible value of `SELECT` type `Metadata Field`. */
    value: Scalars['String']['input'];
};

export type MetadataValue = {
    __typename?: 'MetadataValue';
    /**
     * **DEPRECATED** `DateTime` of the `MetadataValue` creation. This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     */
    createdAt: Scalars['DateTime']['output'];
    /**
     * **DEPRECATED** `User` who created the `MetadataValue`. This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     */
    creator: User;
    /**
     * **DEPRECATED** `MetadataValue` Id. This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     */
    id: Scalars['ID']['output'];
    /**
     * **DEPRECATED** `MetadataField` associated to `MetadataValue`. This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     */
    metadataField: MetadataField;
    /**
     * **DEPRECATED** `DateTime` of the `MetadataValue`'s last modification. This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     */
    modifiedAt?: Maybe<Scalars['DateTime']['output']>;
    /**
     * **DEPRECATED** `User` who last modified the `MetadataValue`. This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. | Date: 2025-01-01T00:00:00.000+00:00
     */
    modifier?: Maybe<User>;
    /**
     * **DEPRECATED** `MetadataValue`'s value. This field will be removed. Use `CustomMetadataValueType.value` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `CustomMetadataValueType.value` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    value: Scalars['String']['output'];
};

export type MoveAssets = {
    __typename?: 'MoveAssets';
    /** List of moved `Asset` items. */
    assets?: Maybe<Array<Asset>>;
};

export type MoveAssetsInput = {
    /** Ids of the `Asset` items to be moved. */
    assetIds: Array<Scalars['ID']['input']>;
    /** Id of the destination entity where `Asset` items should be moved to. Allows `Library`/`Workspace`/`Folder` Ids only. */
    destinationId: Scalars['ID']['input'];
};

export type MoveFolders = {
    __typename?: 'MoveFolders';
    /** List of moved `Folder` ids. */
    ids?: Maybe<Array<Scalars['ID']['output']>>;
};

export type MoveFoldersInput = {
    /** Id of the destination entity where `Folder` items should be moved to. Allows `Library`/`Workspace`/`Folder` Ids only. */
    destinationId: Scalars['ID']['input'];
    /** Ids of the `Folder` items to be moved. */
    folderIds: Array<Scalars['ID']['input']>;
};

export type MultiPageMarking = Marking & {
    __typename?: 'MultiPageMarking';
    /** The `Marking` dimensions in percent of `Asset` dimensions. */
    dimensions?: Maybe<MarkingDimensions>;
    /** The `Asset` page where the `Marking` is set. */
    page?: Maybe<Scalars['Int']['output']>;
    /** The `Marking` position in percent relative to the top left corner of the `Asset`. */
    position: MarkingPosition;
};

/** `NodeInterface` is the base for all types. */
export type Node = {
    /** `Node` Id. */
    id: Scalars['ID']['output'];
};

export type Project = DocumentLibrary | IconLibrary | LogoLibrary | MediaLibrary | Workspace;

/** List of possible `Project` permission levels. */
export enum ProjectPermission {
    Admin = 'ADMIN',
    Comment = 'COMMENT',
    Edit = 'EDIT',
    Translate = 'TRANSLATE',
    View = 'VIEW',
}

/** Different `Project` types */
export enum ProjectType {
    DocumentLibrary = 'DOCUMENT_LIBRARY',
    IconLibrary = 'ICON_LIBRARY',
    LogoLibrary = 'LOGO_LIBRARY',
    MediaLibrary = 'MEDIA_LIBRARY',
    Workspace = 'WORKSPACE',
}

export type ProjectWebhook = Node &
    Webhook & {
        __typename?: 'ProjectWebhook';
        /** DateTime of the `Webhook` creation. */
        createdAt: Scalars['DateTime']['output'];
        /** The `creator` is the `User` who created the `Webhook`. */
        creator: User;
        /** `Webhook` Id. */
        id: Scalars['ID']['output'];
        /** `Webhook` name. */
        name: Scalars['String']['output'];
        /** The `Url` which will be called by the `Webhook` */
        notificationUrl: Scalars['Url']['output'];
        /** Returns the associated `Project`. */
        project: Project;
        /** The randomly generated secret of the current `Webhook`. */
        secret: Scalars['String']['output'];
    };

export type RemoveAssetLicense = {
    __typename?: 'RemoveAssetLicense';
    /** `Asset` details. */
    asset?: Maybe<Asset>;
    /** `License` details. */
    license?: Maybe<License>;
};

export type RemoveAssetLicenseInput = {
    /** `Asset` Id. */
    assetId: Scalars['ID']['input'];
    /** `License` Id. */
    licenseId: Scalars['ID']['input'];
};

export type RemoveAssetPreviewImage = {
    __typename?: 'RemoveAssetPreviewImage';
    /** `Asset` details. */
    asset?: Maybe<Asset>;
};

export type RemoveAssetPreviewImageInput = {
    /** `Asset` Id. */
    id: Scalars['ID']['input'];
};

export type RemoveAssetTags = {
    __typename?: 'RemoveAssetTags';
    /** `Asset` details. */
    asset?: Maybe<Asset>;
};

export type RemoveAssetTagsInput = {
    /** `Asset` Id. */
    id: Scalars['ID']['input'];
    /** `Asset` tags. */
    tags?: InputMaybe<Array<InputMaybe<TagInput>>>;
};

export type RemoveCollectionAssets = {
    __typename?: 'RemoveCollectionAssets';
    /** `Collection` details. */
    collection?: Maybe<Collection>;
};

export type RemoveCollectionAssetsInput = {
    /** Ids of the `Assets` to remove from the `Collection`. */
    assetIds: Array<Scalars['ID']['input']>;
    /** `Collection` Id. */
    collectionId: Scalars['ID']['input'];
};

export type RemoveCustomMetadata = {
    __typename?: 'RemoveCustomMetadata';
    /** List of parentIds with removed `CustomMetadata` values. */
    parentIds: Array<Scalars['ID']['output']>;
};

export type RemoveCustomMetadataInput = {
    /** `CustomMetadata` to be removed from the list of parent Ids. */
    customMetadata: Array<CustomMetadataInput>;
    /** List of parent Ids where `CustomMetadata` should be removed from. */
    parentIds: Array<Scalars['ID']['input']>;
};

export type RemoveCustomMetadataPropertyOptions = {
    __typename?: 'RemoveCustomMetadataPropertyOptions';
    /** `CustomMetadataProperty` details. */
    customMetadataProperty: CustomMetadataProperty;
};

export type RemoveCustomMetadataPropertyOptionsInput = {
    /** `CustomMetadataPropertyOption` Ids. */
    optionIds: Array<Scalars['ID']['input']>;
    /** `CustomMetadataProperty` Id. */
    propertyId: Scalars['ID']['input'];
};

export type RemoveMetadataValue = {
    __typename?: 'RemoveMetadataValue';
    /** `DateTime` of the `MetadataValue` creation. */
    createdAt: Scalars['DateTime']['output'];
    /** `User` who created the `MetadataValue`. */
    creator: User;
    /** `MetadataValue` Id. */
    id: Scalars['ID']['output'];
    /** `MetadataField` related to the `MetadataValue`. */
    metadataField: MetadataField;
    /** `DateTime` of the `MetadataValue` last modification. */
    modifiedAt?: Maybe<Scalars['DateTime']['output']>;
    /** `User` who last modified the `MetadataValue`. */
    modifier?: Maybe<User>;
    /** `MetadataValue` value. */
    value: Scalars['String']['output'];
};

export type RemoveMetadataValueInput = {
    /** `MetadataValue` Id. */
    id: Scalars['ID']['input'];
};

export type ReopenAssetComment = {
    __typename?: 'ReopenAssetComment';
    /** The reopened `AssetComment`. */
    comment?: Maybe<AssetComment>;
};

export type ReopenAssetCommentInput = {
    /** `AssetComment` Id to reopen. */
    id: Scalars['ID']['input'];
};

export type ReplaceAsset = {
    __typename?: 'ReplaceAsset';
    /** The newly created `Asset` processing job response. */
    job: AssetProcessingJob;
};

export type ReplaceAssetInput = {
    /** Parent `Asset` Id. */
    assetId: Scalars['ID']['input'];
    /** Signed file Id returned in `uploadFile`. */
    fileId: Scalars['ID']['input'];
};

export type ReplyToComment = {
    __typename?: 'ReplyToComment';
    /** `AssetCommentReply` details. */
    reply: AssetCommentReply;
};

export type ReplyToCommentInput = {
    /** `AssetComment` Id of the comment you want to reply to. */
    id: Scalars['ID']['input'];
    /** `AssetComment` reply content. Can include `User` mentions by wrapping an authorized `Project` `User` Id in the form of `@[user:<id>]` where `<id>` is the `User` integer or global identifier. */
    reply: Scalars['String']['input'];
};

export type ResolveAssetComment = {
    __typename?: 'ResolveAssetComment';
    /** The resolved `AssetComment`. */
    comment?: Maybe<AssetComment>;
};

export type ResolveAssetCommentInput = {
    /** `AssetComment` Id to resolve. */
    id: Scalars['ID']['input'];
};

export type RgbaColor = {
    __typename?: 'RgbaColor';
    /** Alpha channel value. */
    alpha: Scalars['Percent']['output'];
    /** Blue color channel value. */
    blue: Scalars['RgbColorChannel']['output'];
    /** Green color channel value. */
    green: Scalars['RgbColorChannel']['output'];
    /** Red color channel value. */
    red: Scalars['RgbColorChannel']['output'];
};

export type RootMutation = {
    __typename?: 'RootMutation';
    /** Add a relation between an existing `Asset` and `License`. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. */
    addAssetLicense?: Maybe<AddAssetLicense>;
    /**
     * **DEPRECATED** Add a new relation between an existing `Asset` and an existing `MetadataField` with its value. The value will be automatically created and linked to its `MetadataField`. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. This field will be removed. Use `addCustomMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `addCustomMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    addAssetMetadataFieldValue?: Maybe<AddAssetMetadataFieldValue>;
    /** Add new `Asset` preview image. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. */
    addAssetPreviewImage?: Maybe<AddAssetPreviewImage>;
    /** Relate existing `Asset`s. The `relatedAssetIds` input field list is limited to 100 ids per request and cannot contain the same `assetId` input field value. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. */
    addAssetRelations?: Maybe<AddAssetRelations>;
    /** Add new `Asset` tags. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. */
    addAssetTags?: Maybe<AddAssetTags>;
    /** Add `Assets` to the existing `Collection`. Requires `basic:write` scope to be accessible and `Collection` permission level `EDIT`. */
    addCollectionAssets?: Maybe<AddCollectionAssets>;
    /** Add `CustomMetadata` values to a supported parent (`Asset` | `WorkspaceProject`). Requires `basic:write` scope to be accessible and permission level `EDIT` for the respective parent. */
    addCustomMetadata?: Maybe<AddCustomMetadata>;
    /** Add options to an existing `SELECT` or `MULTISELECT` type `CustomMetadataProperty`. RequiresRequires `basic:write` scope to be accessible and `CustomMetadataProperty` permission level `EDIT`. */
    addCustomMetadataPropertyOptions?: Maybe<AddCustomMetadataPropertyOptions>;
    /** Create a new `Asset`. Requires `basic:write` scope to be accessible and `Project` permission level `EDIT`. */
    createAsset?: Maybe<CreateAsset>;
    /** Create a new `Asset` `Comment`. Requires `basic:write` scope to be accessible and `Asset` permission level `COMMENT`. */
    createAssetComment?: Maybe<CreateAssetComment>;
    /** Create a new `Attachment`. Attachments require a valid parent ID string. This mutation currently only supports attachments for parents of `Asset` type. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. */
    createAttachment?: Maybe<CreateAttachment>;
    /** Create a new `Collection`. Currently supported for `Library` type parent entities only. Requires `basic:write` scope to be accessible and `Collection` permission level `EDIT`. */
    createCollection?: Maybe<CreateCollection>;
    /** Create a new `CustomMetadataProperty`. RequiresRequires `basic:write` scope to be accessible and `Brand` or `Project` permission level `EDIT`. */
    createCustomMetadataProperty?: Maybe<CreateCustomMetadataProperty>;
    /** Create a new External `Asset` from a url. Requires `basic:write` scope to be accessible and `Project` permission level `EDIT`. */
    createExternalAsset?: Maybe<CreateExternalAsset>;
    /** Create a new `Folder`. Requires `basic:write` scope to be accessible and `Project` or `Folder` permission level `EDIT`. */
    createFolder?: Maybe<CreateFolder>;
    /** Create a new `Project` `License`. Requires `basic:write` scope to be accessible and `Project` permission level `EDIT`. */
    createLicense?: Maybe<CreateLicense>;
    /**
     * **DEPRECATED** Create a new `Project` `MetadataField` with your desired configuration. Requires `basic:write` scope to be accessible and `Project` permission level `EDIT`. This field will be removed. Use `createCustomMetadataProperty` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `createCustomMetadataProperty` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    createMetadataField?: Maybe<CreateMetadataField>;
    /** Create a new `Workspace` type `Project`. Requires `basic:write` scope to be accessible. */
    createWorkspaceProject?: Maybe<CreateWorkspaceProject>;
    /** Delete an existing `Asset`. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. */
    deleteAsset?: Maybe<DeleteAsset>;
    /** Delete an existing `Attachment`. Requires `basic:write` scope to be accessible and depending on the `Attachment` type, either `Portal` or `Asset` permission level `EDIT`. */
    deleteAttachment?: Maybe<DeleteAttachment>;
    /** Delete an existing `Collection`. Requires `basic:write` scope to be accessible and `Collection` permission level `EDIT`. */
    deleteCollection?: Maybe<DeleteCollection>;
    /** Delete an existing `Comment`. This will update and/or remove all relations to that `Comment`. Requires `basic:write` scope to be accessible and `Asset` permission level `COMMENT`. */
    deleteComment?: Maybe<DeleteComment>;
    /** Delete an existing `CustomMetadataProperty`. */
    deleteCustomMetadataProperty?: Maybe<DeleteCustomMetadataProperty>;
    /** Delete the existing `Folders`. This will delete all of the `Assets` and `SubFolders` within the `Folders`. Requires `basic:write` scope to be accessible and `Folder` permission level `EDIT`. */
    deleteFolders?: Maybe<DeleteFolders>;
    /** Delete an existing `Project` `License`. This will remove all relations to that `License`. Requires `basic:write` scope to be accessible and `Project` permission level `EDIT`. */
    deleteLicense?: Maybe<DeleteLicense>;
    /**
     * **DEPRECATED** Delete an existing `Project` `MetadataField`. Existing `MetadataField`'s with the same value with be automatically removed. Requires `basic:write` scope to be accessible and `Project` permission level `EDIT`. This field will be removed. Use `deleteCustomMetadataProperty` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `deleteCustomMetadataProperty` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    deleteMetadataField?: Maybe<DeleteMetadataField>;
    /** Edit an existing `AssetComment`. Requires `basic:write` scope to be accessible and `Asset` permission level `COMMENT`. */
    editComment?: Maybe<EditComment>;
    /** Install `Webhook`. Requires `basic:write` and `webhook:write` scopes to be accessible and `Project` permission level `EDIT`. */
    installProjectWebhook?: Maybe<InstallProjectWebhook>;
    /** Invite `Project` user. Requires `basic:write` scope to be accessible and `Project` permission level `EDIT`. Limitations: Does not work if User Provisioning feature is enabled. */
    inviteProjectUser?: Maybe<InviteProjectUser>;
    /** Move existing `Asset` item(s) to the given `Library`, `Workspace` or `Folder` destination. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. */
    moveAssets?: Maybe<MoveAssets>;
    /** Move existing `Folder` item(s) to the given `Library`, `Workspace` or `Folder` destination. This operation will move all of the `Asset` item(s) and `SubFolder` item(s) within the provided `Folder` item(s). Requires `basic:write` scope to be accessible and `Folder` permission level `EDIT`. */
    moveFolders?: Maybe<MoveFolders>;
    /** Remove an existing relation between an `Asset` and a `License`. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. */
    removeAssetLicense?: Maybe<RemoveAssetLicense>;
    /** Remove existing `Asset` preview image. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. */
    removeAssetPreviewImage?: Maybe<RemoveAssetPreviewImage>;
    /** Remove existing `Asset` tags. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. */
    removeAssetTags?: Maybe<RemoveAssetTags>;
    /** Remove `Assets` from the existing `Collection`. Requires `basic:write` scope to be accessible and `Collection` permission level `EDIT`. */
    removeCollectionAssets?: Maybe<RemoveCollectionAssets>;
    /** Remove `CustomMetadata` values from a supported parent (`Asset` | `WorkspaceProject`). Requires `basic:write` scope to be accessible and permission level `EDIT` for the respective parent. */
    removeCustomMetadata?: Maybe<RemoveCustomMetadata>;
    /** Remove options from an existing `SELECT` or `MULTISELECT` type `CustomMetadataProperty`. RequiresRequires `basic:write` scope to be accessible and `CustomMetadataProperty` permission level `EDIT`. */
    removeCustomMetadataPropertyOptions?: Maybe<RemoveCustomMetadataPropertyOptions>;
    /**
     * **DEPRECATED** Remove existing `MetadataField` value.Existing relations to that `MetadataField` with the same value will be automatically removed.Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. This field will be removed. Use `removeCustomMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `removeCustomMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    removeMetadataValue?: Maybe<RemoveMetadataValue>;
    /** Reopens a resolved `AssetComment`. Requires `basic:write` scope to be accessible and `Comment` permission level `EDIT`. */
    reopenAssetComment?: Maybe<ReopenAssetComment>;
    /** Replace an existing `Asset`. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. */
    replaceAsset?: Maybe<ReplaceAsset>;
    /** Add a new reply to an existing `Asset` `Comment`. Requires `basic:write` scope to be accessible and `Asset` permission level `COMMENT`. */
    replyToComment?: Maybe<ReplyToComment>;
    /** Resolve an open `AssetComment`. Requires `basic:write` scope to be accessible and `Comment` permission level `EDIT`. */
    resolveAssetComment?: Maybe<ResolveAssetComment>;
    /** Replace the existing set of the `Assets` in the `Collection` with the new set of the `Assets`. Requires `basic:write` scope to be accessible and `Project` permission level `EDIT`. */
    setCollectionAssets?: Maybe<SetCollectionAssets>;
    /** Sync `Asset` tags. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. */
    syncAssetTags?: Maybe<SyncAssetTags>;
    /** Uninstall `Webhook`. Requires `basic:write` and `webhook:write` scopes to be accessible and `Project` permission level `EDIT`. */
    uninstallWebhook?: Maybe<UninstallWebhook>;
    /** Update an existing `Asset`. Requires `basic:write` scope to be accessible and `Asset` permission level `EDIT`. */
    updateAsset?: Maybe<UpdateAsset>;
    /** Update an existing `Collection`. Requires `basic:write` scope to be accessible and `Collection` permission level `EDIT`. */
    updateCollection?: Maybe<UpdateCollection>;
    /** Update an existing `CustomMetadataProperty`. RequiresRequires `basic:write` scope to be accessible and `CustomMetadataProperty` permission level `EDIT`. */
    updateCustomMetadataProperty?: Maybe<UpdateCustomMetadataProperty>;
    /** Update an existing `Folder`. Requires `basic:write` scope to be accessible and `Folder` permission level `EDIT`. */
    updateFolder?: Maybe<UpdateFolder>;
    /** Upload a new file. This stores the binary file temporarily so it can be then permanently linked to a specific type (ie. `Asset`, `Attachment`, `Revision`) after the upload is complete by using a different mutation. Requires `basic:write` scope to be accessible. */
    uploadFile?: Maybe<UploadFile>;
};

export type RootMutationAddAssetLicenseArgs = {
    input: AddAssetLicenseInput;
};

export type RootMutationAddAssetMetadataFieldValueArgs = {
    input: AddAssetMetadataFieldValueInput;
};

export type RootMutationAddAssetPreviewImageArgs = {
    input: AddAssetPreviewImageInput;
};

export type RootMutationAddAssetRelationsArgs = {
    input: AddAssetRelationsInput;
};

export type RootMutationAddAssetTagsArgs = {
    input: AddAssetTagsInput;
};

export type RootMutationAddCollectionAssetsArgs = {
    input: AddCollectionAssetsInput;
};

export type RootMutationAddCustomMetadataArgs = {
    input: AddCustomMetadataInput;
};

export type RootMutationAddCustomMetadataPropertyOptionsArgs = {
    input: AddCustomMetadataPropertyOptionsInput;
};

export type RootMutationCreateAssetArgs = {
    input: CreateAssetInput;
};

export type RootMutationCreateAssetCommentArgs = {
    input: CreateAssetCommentInput;
};

export type RootMutationCreateAttachmentArgs = {
    input: CreateAttachmentInput;
};

export type RootMutationCreateCollectionArgs = {
    input: CreateCollectionInput;
};

export type RootMutationCreateCustomMetadataPropertyArgs = {
    input: CreateCustomMetadataPropertyInput;
};

export type RootMutationCreateExternalAssetArgs = {
    input: CreateExternalAssetInput;
};

export type RootMutationCreateFolderArgs = {
    input: CreateFolderInput;
};

export type RootMutationCreateLicenseArgs = {
    input: CreateLicenseInput;
};

export type RootMutationCreateMetadataFieldArgs = {
    input: CreateMetadataFieldInput;
};

export type RootMutationCreateWorkspaceProjectArgs = {
    input: CreateWorkspaceProjectInput;
};

export type RootMutationDeleteAssetArgs = {
    input: DeleteAssetInput;
};

export type RootMutationDeleteAttachmentArgs = {
    input: DeleteAttachmentInput;
};

export type RootMutationDeleteCollectionArgs = {
    input: DeleteCollectionInput;
};

export type RootMutationDeleteCommentArgs = {
    input: DeleteCommentInput;
};

export type RootMutationDeleteCustomMetadataPropertyArgs = {
    input: DeleteCustomMetadataPropertyInput;
};

export type RootMutationDeleteFoldersArgs = {
    input: DeleteFoldersInput;
};

export type RootMutationDeleteLicenseArgs = {
    input: DeleteLicenseInput;
};

export type RootMutationDeleteMetadataFieldArgs = {
    input: DeleteMetadataFieldInput;
};

export type RootMutationEditCommentArgs = {
    input: EditCommentInput;
};

export type RootMutationInstallProjectWebhookArgs = {
    input: InstallProjectWebhookInput;
};

export type RootMutationInviteProjectUserArgs = {
    input: InviteProjectUserInput;
};

export type RootMutationMoveAssetsArgs = {
    input: MoveAssetsInput;
};

export type RootMutationMoveFoldersArgs = {
    input: MoveFoldersInput;
};

export type RootMutationRemoveAssetLicenseArgs = {
    input: RemoveAssetLicenseInput;
};

export type RootMutationRemoveAssetPreviewImageArgs = {
    input: RemoveAssetPreviewImageInput;
};

export type RootMutationRemoveAssetTagsArgs = {
    input: RemoveAssetTagsInput;
};

export type RootMutationRemoveCollectionAssetsArgs = {
    input: RemoveCollectionAssetsInput;
};

export type RootMutationRemoveCustomMetadataArgs = {
    input: RemoveCustomMetadataInput;
};

export type RootMutationRemoveCustomMetadataPropertyOptionsArgs = {
    input: RemoveCustomMetadataPropertyOptionsInput;
};

export type RootMutationRemoveMetadataValueArgs = {
    input: RemoveMetadataValueInput;
};

export type RootMutationReopenAssetCommentArgs = {
    input: ReopenAssetCommentInput;
};

export type RootMutationReplaceAssetArgs = {
    input: ReplaceAssetInput;
};

export type RootMutationReplyToCommentArgs = {
    input: ReplyToCommentInput;
};

export type RootMutationResolveAssetCommentArgs = {
    input: ResolveAssetCommentInput;
};

export type RootMutationSetCollectionAssetsArgs = {
    input: SetCollectionAssetsInput;
};

export type RootMutationSyncAssetTagsArgs = {
    input: SyncAssetTagsInput;
};

export type RootMutationUninstallWebhookArgs = {
    input: UninstallWebhookInput;
};

export type RootMutationUpdateAssetArgs = {
    input: UpdateAssetInput;
};

export type RootMutationUpdateCollectionArgs = {
    input: UpdateCollectionInput;
};

export type RootMutationUpdateCustomMetadataPropertyArgs = {
    input: UpdateCustomMetadataPropertyInput;
};

export type RootMutationUpdateFolderArgs = {
    input: UpdateFolderInput;
};

export type RootMutationUploadFileArgs = {
    input: UploadFileInput;
};

export type RootQuery = {
    __typename?: 'RootQuery';
    /** Retrieve current `Account` details. */
    account: Account;
    /** Retrieve `Asset` details by Id. */
    asset?: Maybe<Asset>;
    /** Retrieve `Assets` details by Ids. */
    assets?: Maybe<Array<Maybe<Asset>>>;
    /** Retrieve a `Brand` by its Id. */
    brand?: Maybe<Brand>;
    /** Retrieve `Brand` list for current `Account`. */
    brands?: Maybe<Array<Maybe<Brand>>>;
    /** Get the current `User`. */
    currentUser: User;
    /** Retrieve `Library` details by Id. */
    library?: Maybe<Library>;
    /** Retrieve `Node` details by Id. */
    node?: Maybe<Node>;
    /**
     * **DEPRECATED** Retrieve `Project` details by Id. This field will be removed. Use `library` or `workspaceProject` instead. | Date: 2023-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `library` or `workspaceProject` instead. | Date: 2023-01-01T00:00:00.000+00:00
     */
    project?: Maybe<Project>;
    /** Retrieve `WebhookItems` related to current `Account`. */
    webhooks?: Maybe<WebhookItems>;
    /** Retrieve `WorkspaceProject` details by Id. */
    workspaceProject?: Maybe<Workspace>;
};

export type RootQueryAssetArgs = {
    id: Scalars['ID']['input'];
};

export type RootQueryAssetsArgs = {
    ids: Array<Scalars['ID']['input']>;
};

export type RootQueryBrandArgs = {
    id: Scalars['ID']['input'];
};

export type RootQueryLibraryArgs = {
    id: Scalars['ID']['input'];
};

export type RootQueryNodeArgs = {
    id: Scalars['ID']['input'];
};

export type RootQueryProjectArgs = {
    id: Scalars['ID']['input'];
};

export type RootQueryWebhooksArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type RootQueryWorkspaceProjectArgs = {
    id: Scalars['ID']['input'];
};

export type SetCollectionAssets = {
    __typename?: 'SetCollectionAssets';
    /** `Collection` details. */
    collection?: Maybe<Collection>;
};

export type SetCollectionAssetsInput = {
    /** Ids of the `Assets` to replace existing `Assets` in the `Collection`. Must be in the same `Library` as the `Collection`. */
    assetIds: Array<Scalars['ID']['input']>;
    /** `Collection` Id. */
    collectionId: Scalars['ID']['input'];
};

export type SimpleMarking = Marking & {
    __typename?: 'SimpleMarking';
    /** The `Marking` dimensions in percent of `Asset` dimensions. */
    dimensions?: Maybe<MarkingDimensions>;
    /** The `Marking` position in percent relative to the top left corner of the `Asset`. */
    position: MarkingPosition;
};

export type SubFolder = Folder &
    Node & {
        __typename?: 'SubFolder';
        /** The `AssetItems` in the current `SubFolder`. */
        assets: AssetItems;
        /** A list of `Breadcrumb` items representing the parent folders structure for the current `SubFolder`. */
        breadcrumbs: Array<Breadcrumb>;
        /** `DateTime` of the `SubFolder` creation. */
        createdAt: Scalars['DateTime']['output'];
        /** The `User` who created the `SubFolder`. */
        creator: User;
        /** The `FolderItems` of the current `Folder`. */
        folders: FolderItems;
        /** `SubFolder` Id. */
        id: Scalars['ID']['output'];
        /** `DateTime` of the last `SubFolder` modification. */
        modifiedAt?: Maybe<Scalars['DateTime']['output']>;
        /** The `User` who last modified the `SubFolder`. */
        modifier?: Maybe<User>;
        /** `SubFolder` name. */
        name: Scalars['String']['output'];
        /**
         * **DEPRECATED** The `SubFolderItems` of the current `SubFolder`. This field will be removed. Use `folders` instead. | Date: 2024-07-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `folders` instead. | Date: 2024-07-01T00:00:00.000+00:00
         */
        subFolders: SubFolderItems;
    };

export type SubFolderAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type SubFolderFoldersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type SubFolderSubFoldersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type SubFolderItems = {
    __typename?: 'SubFolderItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** List of type `SubFolder` */
    items?: Maybe<Array<Maybe<SubFolder>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type SyncAssetTags = {
    __typename?: 'SyncAssetTags';
    /** `Asset` details. */
    asset?: Maybe<Asset>;
};

export type SyncAssetTagsInput = {
    /** `Asset` Id. */
    id: Scalars['ID']['input'];
    /** `Asset` tags. */
    tags?: InputMaybe<Array<InputMaybe<TagInput>>>;
};

export type Tag = {
    __typename?: 'Tag';
    /** `Tag` source indicating how the tag was linked to the `Asset`. AUTO: created by AI `Asset` recognition. MANUAL: manually added. */
    source?: Maybe<TagSource>;
    /** `Tag` value. */
    value: Scalars['String']['output'];
};

export type TagInput = {
    /** Tag name. */
    value: Scalars['String']['input'];
};

/** The source of a `tag`. */
export enum TagSource {
    Auto = 'AUTO',
    Manual = 'MANUAL',
}

export type UninstallWebhook = {
    __typename?: 'UninstallWebhook';
    /** `Webhook` details. */
    webhook: Webhook;
};

export type UninstallWebhookInput = {
    /** Id of the `Webhook` to be uninstalled. */
    id: Scalars['ID']['input'];
};

export type UpdateAsset = {
    __typename?: 'UpdateAsset';
    /** `Asset` details. */
    asset?: Maybe<Asset>;
};

export type UpdateAssetDataInput = {
    /** Represents the Author of the `Asset`. Example: Photographer Name. */
    author?: InputMaybe<Scalars['String']['input']>;
    /** Change `Asset` copyright details. */
    copyright?: InputMaybe<UpdateCopyrightInput>;
    /** `Asset` description. */
    description?: InputMaybe<Scalars['String']['input']>;
    /** Modify expiry date. `Asset` will expire once the defined date is reached. */
    expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
    /** `Asset` filename, including extension. */
    filename?: InputMaybe<Scalars['String']['input']>;
    /** `Asset` title or display name. */
    title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAssetInput = {
    /** `Asset` data. */
    data: UpdateAssetDataInput;
    /** `Asset` Id. */
    id: Scalars['ID']['input'];
};

export type UpdateCollection = {
    __typename?: 'UpdateCollection';
    /** `Collection` details. */
    collection: Collection;
};

export type UpdateCollectionDataInput = {
    /** Name of the `Collection`. */
    name: Scalars['String']['input'];
};

export type UpdateCollectionInput = {
    /** `Collection` Id. */
    collectionId: Scalars['ID']['input'];
    /** `Collection` data. */
    data: UpdateCollectionDataInput;
};

export type UpdateCopyrightInput = {
    /** `Asset` copyright notice. */
    notice?: InputMaybe<Scalars['String']['input']>;
    /** `Asset` copyright status. */
    status: CopyrightStatus;
};

export type UpdateCustomMetadataProperty = {
    __typename?: 'UpdateCustomMetadataProperty';
    /** Name of the updated `CustomMetadataProperty`. */
    property: CustomMetadataProperty;
};

export type UpdateCustomMetadataPropertyDataInput = {
    /** Set a `CustomMetadataProperty` default value. This setting will be ignored for properties that are not of `SELECT` or `MULTISELECT` type  (use options for these cases instead). Applies to newly uploaded `Assets` only. */
    defaultValue?: InputMaybe<Scalars['String']['input']>;
    /** `CustomMetadataProperty` help text. */
    helpText?: InputMaybe<Scalars['String']['input']>;
    /** Define if `CustomMetadataProperty` is required. */
    isRequired?: InputMaybe<Scalars['Boolean']['input']>;
    /** `CustomMetadataProperty` display name. */
    name?: InputMaybe<Scalars['String']['input']>;
    /** `CustomMetadataProperty` type details. */
    type?: InputMaybe<UpdateCustomMetadataPropertyTypeInput>;
};

export type UpdateCustomMetadataPropertyInput = {
    /** `CustomMetadataProperty` data. */
    data: UpdateCustomMetadataPropertyDataInput;
    /** `CustomMetadataProperty` Id. */
    id: Scalars['ID']['input'];
};

export type UpdateCustomMetadataPropertyTypeInput = {
    /** Define CustomMetadataProperty` options for `SELECT` or `MULTISELECT` type properties. */
    options?: InputMaybe<Array<UpdateCustomMetadataPropertyTypeOptionInput>>;
};

export type UpdateCustomMetadataPropertyTypeOptionInput = {
    /** `CustomMetadataPropertyOption` Id. This is an optional field only consider for editing purposes. */
    id?: InputMaybe<Scalars['ID']['input']>;
    /** Define `CustomMetadataPropertyOption` as default. Applies to newly created `Assets` only. */
    isDefault?: InputMaybe<Scalars['Boolean']['input']>;
    /** `CustomMetadataPropertyOption` value. */
    value: Scalars['String']['input'];
};

export type UpdateFolder = {
    __typename?: 'UpdateFolder';
    /** `Folder` details. */
    folder?: Maybe<Folder>;
};

export type UpdateFolderDataInput = {
    /** `Folder` description. */
    description?: InputMaybe<Scalars['String']['input']>;
    /** `Folder` name or display name. */
    name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFolderInput = {
    /** `Folder` data. */
    data: UpdateFolderDataInput;
    /** `Folder` Id. */
    id: Scalars['ID']['input'];
};

export type UploadFile = {
    __typename?: 'UploadFile';
    /** Signed Id. */
    id: Scalars['ID']['output'];
    /** Arrays with upload `Urls` to upload the file. */
    urls: Array<Maybe<Scalars['Url']['output']>>;
};

export type UploadFileInput = {
    /** `File` chunk size in bytes. Value must be integer between 5MB and 1GB. */
    chunkSize?: InputMaybe<Scalars['BigInt']['input']>;
    /** `File` name. This value will be passed on to the `fileId` input variable used in file mutations such as `createAsset`, `replaceAsset`, `createAttachment` or `addAssetPreviewImage`. */
    filename: Scalars['String']['input'];
    /** `File` size in bytes. */
    size: Scalars['BigInt']['input'];
};

/** `UserInterface` for `User` returnable types. */
export type User = {
    /** `User` avatar. */
    avatar?: Maybe<Scalars['Url']['output']>;
    /** `User` email. */
    email: Scalars['Email']['output'];
    /** `User` Id. */
    id: Scalars['ID']['output'];
    /** `User` name. */
    name?: Maybe<Scalars['String']['output']>;
};

export type UserGroup = Node & {
    __typename?: 'UserGroup';
    /** `UserGroup` Id. */
    id: Scalars['ID']['output'];
    /** `UserGroup` name. */
    name?: Maybe<Scalars['String']['output']>;
    /** `UserGroup`'s `UserItems`. */
    users?: Maybe<UserItems>;
};

export type UserGroupUsersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type UserGroupItems = {
    __typename?: 'UserGroupItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** List of type `UserGroup`. */
    items?: Maybe<Array<Maybe<UserGroup>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type UserItems = {
    __typename?: 'UserItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** `User` items list. */
    items?: Maybe<Array<Maybe<User>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type Video = Asset &
    Node & {
        __typename?: 'Video';
        /** `Attachment` items linked to `Asset`. */
        attachments?: Maybe<Array<Maybe<AssetAttachment>>>;
        /** Represents the Author of the `Asset`. Example: Photographer Name. */
        author?: Maybe<Scalars['String']['output']>;
        /** `Video` bitrate in bits per second. */
        bitrate: Scalars['Int']['output'];
        /** Paginated list of `AssetComment` items for `Asset`. */
        comments?: Maybe<AssetCommentItems>;
        /** `Asset` copyright details. */
        copyright?: Maybe<Copyright>;
        /** `DateTime` of the `Asset` creation. */
        createdAt: Scalars['DateTime']['output'];
        /** The `User` who created the `Asset`. */
        creator: User;
        /** Current `User` `Asset` permissions. */
        currentUserPermissions: AssetUserPermissions;
        /** List of `CustomMetadataProperty` items and values associated to `Asset`. */
        customMetadata: Array<CustomMetadata>;
        /** Description of the `Asset`. */
        description?: Maybe<Scalars['String']['output']>;
        /** Signed `Url` to download the original `Video` type file. */
        downloadUrl?: Maybe<Scalars['Url']['output']>;
        /** `Video` duration in seconds. */
        duration: Scalars['Float']['output'];
        /** `Asset` expiry date. */
        expiresAt?: Maybe<Scalars['DateTime']['output']>;
        /** Extension of the `Asset` `File`. */
        extension: Scalars['String']['output'];
        /** External Id of the `Asset`. */
        externalId?: Maybe<Scalars['ID']['output']>;
        /** `ExternalProduct` items linked to `Asset`. */
        externalProducts?: Maybe<Array<Maybe<ExternalProduct>>>;
        /** Original filename of the `Asset` `File`. */
        filename?: Maybe<Scalars['String']['output']>;
        /** `Video` height in pixels. */
        height: Scalars['Int']['output'];
        /** `Asset` id. */
        id: Scalars['ID']['output'];
        /** `License` items linked to `Asset`. */
        licenses?: Maybe<Array<Maybe<License>>>;
        /**
         * **DEPRECATED** `MetadataValue` items linked to `Asset`. This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
         * @deprecated This field will be removed. Use `customMetadata` instead. | Date: 2025-01-01T00:00:00.000+00:00
         */
        metadataValues?: Maybe<Array<Maybe<MetadataValue>>>;
        /** `DateTime` of the `Asset` last modification. */
        modifiedAt?: Maybe<Scalars['DateTime']['output']>;
        /** The `User` who last modified the `Asset`. */
        modifier?: Maybe<User>;
        /** Preview `Url` of converted `Video` in mp4 format. */
        previewUrl: Scalars['Url']['output'];
        /** Paginated list of `Asset` items related to `Asset`. */
        relatedAssets: AssetItems;
        /** Size of the `Asset` `File` in bytes. */
        size?: Maybe<Scalars['BigInt']['output']>;
        /** Represents the conversion status of the `Asset`. Example: FINISHED. */
        status: AssetStatusType;
        /** List of `Tag` items linked to `Asset` */
        tags?: Maybe<Array<Maybe<Tag>>>;
        /** Title of the `Asset`. */
        title: Scalars['String']['output'];
        /** `Video` width in pixels. */
        width: Scalars['Int']['output'];
    };

export type VideoCommentsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<AssetCommentQueryInput>;
};

export type VideoDownloadUrlArgs = {
    permanent?: InputMaybe<Scalars['Boolean']['input']>;
    validityInDays?: InputMaybe<Scalars['Int']['input']>;
};

export type VideoPreviewUrlArgs = {
    height?: InputMaybe<Scalars['Int']['input']>;
    width?: InputMaybe<Scalars['Int']['input']>;
};

export type VideoRelatedAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type VideoMarking = Marking & {
    __typename?: 'VideoMarking';
    /** The `Marking` dimensions in percent of `Asset` dimensions. */
    dimensions?: Maybe<MarkingDimensions>;
    /** The `Marking` position in percent relative to the top left corner of the `Asset`. */
    position: MarkingPosition;
    /** The timeframe of the `Marking`. Applicable to `Video` type `Asset` items only. */
    timeframe?: Maybe<MarkingTimeframe>;
};

/** `WebhookInterface` for `Webhook` returnable types. */
export type Webhook = {
    /** `DateTime` of the `Asset` creation. */
    createdAt: Scalars['DateTime']['output'];
    /** The `creator` is the `User` who created the asset on Frontify. */
    creator: User;
    /** `Workspace` Id. */
    id: Scalars['ID']['output'];
    /** The name of the current `Webhook`. */
    name: Scalars['String']['output'];
    /** The `Url` which will be called by the `Webhook`. */
    notificationUrl: Scalars['Url']['output'];
    /** The randomly generated secret of the current `Webhook`. */
    secret: Scalars['String']['output'];
};

export type WebhookItems = {
    __typename?: 'WebhookItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** List of type `Webhook`. */
    items?: Maybe<Array<Maybe<Webhook>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type Workspace = Node & {
    __typename?: 'Workspace';
    /**
     * **DEPRECATED** Amount of `Assets` contained in the `Library`/`Workspace`. This field will be removed. Use `assets`.`total` instead. | Date: 2024-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `assets`.`total` instead. | Date: 2024-01-01T00:00:00.000+00:00
     */
    assetCount?: Maybe<Scalars['Int']['output']>;
    /** Search or list `Assets` in the `Library`/`Workspace`. */
    assets: AssetItems;
    /** Browse the `Workspace`'s `SubFolderItems` and `AssetItems`. */
    browse: WorkspaceRootFolder;
    /** `Workspace` collaborators. */
    collaborators?: Maybe<WorkspaceCollaborators>;
    /** `Library`/`Workspace` color. */
    color?: Maybe<RgbaColor>;
    /** `Workspace` permissions of the current `User`. */
    currentUserPermissions: WorkspaceUserPermissions;
    /** List of `CustomMetadataProperty` items and values associated to `Workspace`. */
    customMetadata: Array<CustomMetadata>;
    /** `Library`/`Workspace` Id. */
    id: Scalars['ID']['output'];
    /** `Library`/`Workspace` `License` items list. */
    licenses?: Maybe<Array<Maybe<License>>>;
    /**
     * **DEPRECATED** `Library`/`Workspace` `MetadataField` items list. This field will be removed. Use `customMetadataProperties` instead. | Date: 2025-01-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `customMetadataProperties` instead. | Date: 2025-01-01T00:00:00.000+00:00
     */
    metadataFields?: Maybe<Array<Maybe<MetadataField>>>;
    /** `Library`/`Workspace` name. */
    name: Scalars['String']['output'];
};

export type WorkspaceAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
    query?: InputMaybe<AssetQueryInput>;
};

export type WorkspaceCollaboratorUserItems = {
    __typename?: 'WorkspaceCollaboratorUserItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** List of `User` items that have lowest required permissions to collaborate on a `Workspace`. */
    items?: Maybe<Array<Maybe<User>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type WorkspaceCollaborators = {
    __typename?: 'WorkspaceCollaborators';
    /** `WorkspaceCollaboratorUserItems` list. */
    users: WorkspaceCollaboratorUserItems;
};

export type WorkspaceCollaboratorsUsersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type WorkspaceItems = {
    __typename?: 'WorkspaceItems';
    /** Indicates if a next page is available or not */
    hasNextPage: Scalars['Boolean']['output'];
    /** List of type `Workspace`. */
    items?: Maybe<Array<Maybe<Workspace>>>;
    /** Number of results per page. */
    limit: Scalars['Int']['output'];
    /** Current page number. */
    page: Scalars['Int']['output'];
    /** Total amount of results. */
    total: Scalars['Int']['output'];
};

export type WorkspaceRootFolder = {
    __typename?: 'WorkspaceRootFolder';
    /** `Library`/`Workspace`'s `AssetItems` list. */
    assets: AssetItems;
    /** The `FolderItems` of the current `Library`/`Workspace`. */
    folders: FolderItems;
    /**
     * **DEPRECATED** The `SubFolderItems` of the current `Library`/`Workspace`. This field will be removed. Use `folders` instead. | Date: 2024-07-01T00:00:00.000+00:00
     * @deprecated This field will be removed. Use `folders` instead. | Date: 2024-07-01T00:00:00.000+00:00
     */
    subFolders: SubFolderItems;
};

export type WorkspaceRootFolderAssetsArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type WorkspaceRootFolderFoldersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type WorkspaceRootFolderSubFoldersArgs = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type WorkspaceUserPermissions = {
    __typename?: 'WorkspaceUserPermissions';
    /** Check if current `User` has `Asset` creation permissions in a specific `Workspace`. */
    canCreateAssets: Scalars['Boolean']['output'];
    /** Check if current `User` has `Collaborator` view permissions in a specific `Workspace`. */
    canViewCollaborators: Scalars['Boolean']['output'];
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
    __typename?: 'RootQuery';
    currentUser: { __typename?: 'AccountUser'; id: string; email: any; avatar?: any | null; name?: string | null };
};

export const CurrentUserDocument = gql`
    query CurrentUser {
        currentUser {
            id
            email
            avatar
            name
        }
    }
`;

export type SdkFunctionWrapper = <T>(
    action: (requestHeaders?: Record<string, string>) => Promise<T>,
    operationName: string,
    operationType?: string,
    variables?: any,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
    return {
        CurrentUser(
            variables?: CurrentUserQueryVariables,
            requestHeaders?: GraphQLClientRequestHeaders,
        ): Promise<CurrentUserQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<CurrentUserQuery>(CurrentUserDocument, variables, {
                        ...requestHeaders,
                        ...wrappedRequestHeaders,
                    }),
                'CurrentUser',
                'query',
                variables,
            );
        },
    };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
    const sdk = getSdk(client, withWrapper);
    return {
        ...sdk,
        useCurrentUser(
            key: SWRKeyInterface,
            variables?: CurrentUserQueryVariables,
            config?: SWRConfigInterface<CurrentUserQuery, ClientError>,
        ) {
            return useSWR<CurrentUserQuery, ClientError>(key, () => sdk.CurrentUser(variables), config);
        },
    };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;
