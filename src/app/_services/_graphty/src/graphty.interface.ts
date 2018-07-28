interface FunctionHeader {
   name: string;
   args?: any,
   variables?: any
}

export interface GQLQProducerInterface {
   fun: FunctionHeader;
   ret?: Array<string | any>;
}