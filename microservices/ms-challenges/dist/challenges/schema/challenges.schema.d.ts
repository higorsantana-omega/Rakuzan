import mongoose from 'mongoose';
export declare const ChallengeSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    collection: string;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    players: mongoose.Types.ObjectId[];
    dateTime?: Date;
    dateRequest?: Date;
    dateResponse?: Date;
    status?: string;
    request?: mongoose.Types.ObjectId;
    category?: mongoose.Types.ObjectId;
    match?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    players: mongoose.Types.ObjectId[];
    dateTime?: Date;
    dateRequest?: Date;
    dateResponse?: Date;
    status?: string;
    request?: mongoose.Types.ObjectId;
    category?: mongoose.Types.ObjectId;
    match?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    players: mongoose.Types.ObjectId[];
    dateTime?: Date;
    dateRequest?: Date;
    dateResponse?: Date;
    status?: string;
    request?: mongoose.Types.ObjectId;
    category?: mongoose.Types.ObjectId;
    match?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
