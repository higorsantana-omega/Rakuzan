import mongoose from 'mongoose';
export declare const MatchSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    collection: string;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    players: mongoose.Types.ObjectId[];
    result: {
        set?: string;
    }[];
    category?: mongoose.Types.ObjectId;
    challenge?: mongoose.Types.ObjectId;
    def?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    players: mongoose.Types.ObjectId[];
    result: {
        set?: string;
    }[];
    category?: mongoose.Types.ObjectId;
    challenge?: mongoose.Types.ObjectId;
    def?: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    players: mongoose.Types.ObjectId[];
    result: {
        set?: string;
    }[];
    category?: mongoose.Types.ObjectId;
    challenge?: mongoose.Types.ObjectId;
    def?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
