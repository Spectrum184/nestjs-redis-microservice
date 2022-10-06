export class GetPostDto {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly content: string;
}

export class CreatePostDto {
  readonly slug: string;
  readonly name: string;
  readonly content: string;
}
