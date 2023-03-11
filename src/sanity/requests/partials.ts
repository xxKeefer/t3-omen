export const GroqContent = `content[]{
      _type == 'image' => {
        _key,
        _type,
        alt,
        'url': asset->url,
        'dimensions': asset->metadata.dimensions{
          width, height, aspectRatio
        }
      },
      _type != 'image' => @,
    }`;
