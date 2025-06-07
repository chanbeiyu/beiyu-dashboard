import { withProps } from '@udecode/cn'
import { AIPlugin } from '@udecode/plate-ai/react'
import { BoldPlugin, CodePlugin, ItalicPlugin, StrikethroughPlugin, SubscriptPlugin, SuperscriptPlugin, UnderlinePlugin } from '@udecode/plate-basic-marks/react'
import { BlockquotePlugin } from '@udecode/plate-block-quote/react'
import { CodeBlockPlugin, CodeLinePlugin, CodeSyntaxPlugin } from '@udecode/plate-code-block/react'
import { CommentsPlugin } from '@udecode/plate-comments/react'
import { DatePlugin } from '@udecode/plate-date/react'
import { EmojiInputPlugin } from '@udecode/plate-emoji/react'
import { ExcalidrawPlugin } from '@udecode/plate-excalidraw/react'
import { HEADING_KEYS } from '@udecode/plate-heading'
import { TocPlugin } from '@udecode/plate-heading/react'
import { HighlightPlugin } from '@udecode/plate-highlight/react'
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react'
import { KbdPlugin } from '@udecode/plate-kbd/react'
import { ColumnItemPlugin, ColumnPlugin } from '@udecode/plate-layout/react'
import { LinkPlugin } from '@udecode/plate-link/react'
import { BulletedListPlugin, ListItemPlugin, NumberedListPlugin } from '@udecode/plate-list/react'
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react'
import { MentionInputPlugin, MentionPlugin } from '@udecode/plate-mention/react'
import { SlashInputPlugin } from '@udecode/plate-slash-command/react'
import { TableCellHeaderPlugin, TableCellPlugin, TablePlugin, TableRowPlugin } from '@udecode/plate-table/react'
import { TogglePlugin } from '@udecode/plate-toggle/react'
import { ParagraphPlugin, PlateElement, PlateLeaf, usePlateEditor } from '@udecode/plate/react'

import { copilotPlugins } from '../plugins/copilot-plugins'
import { editorPlugins } from '../plugins/editor-plugins'
import { FixedToolbarListPlugin } from '../plugins/fixed-toolbar-list-plugin'
import { FloatingToolbarPlugin } from '../plugins/floating-toolbar-plugin'
import { AILeaf } from './ai-leaf'
import { BlockquoteElement } from './blockquote-element'
import { CodeBlockElement } from './code-block-element'
import { CodeLeaf } from './code-leaf'
import { CodeLineElement } from './code-line-element'
import { CodeSyntaxLeaf } from './code-syntax-leaf'
import { ColumnElement } from './column-element'
import { ColumnGroupElement } from './column-group-element'
import { CommentLeaf } from './comment-leaf'
import { DateElement } from './date-element'
import { EmojiInputElement } from './emoji-input-element'
import { ExcalidrawElement } from './excalidraw-element'
import { HeadingElement } from './heading-element'
import { HighlightLeaf } from './highlight-leaf'
import { HrElement } from './hr-element'
import { ImageElement } from './image-element'
import { KbdLeaf } from './kbd-leaf'
import { LinkElement } from './link-element'
import { ListElement } from './list-element'
import { MediaEmbedElement } from './media-embed-element'
import { MentionElement } from './mention-element'
import { MentionInputElement } from './mention-input-element'
import { ParagraphElement } from './paragraph-element'
import { withPlaceholders } from './placeholder'
import { SlashInputElement } from './slash-input-element'
import {
   TableCellElement,
   TableCellHeaderElement,
} from './table-cell-element'
import { TableElement } from './table-element'
import { TableRowElement } from './table-row-element'
import { TocElement } from './toc-element'
import { ToggleElement } from './toggle-element'

export const useCreateEditor = () => {
   return usePlateEditor({
      components: withPlaceholders({
         [AIPlugin.key]: AILeaf,
         [BlockquotePlugin.key]: BlockquoteElement,
         [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
         [BulletedListPlugin.key]: withProps(ListElement, { variant: 'ul' }),
         [CodeBlockPlugin.key]: CodeBlockElement,
         [CodeLinePlugin.key]: CodeLineElement,
         [CodePlugin.key]: CodeLeaf,
         [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
         [ColumnItemPlugin.key]: ColumnElement,
         [ColumnPlugin.key]: ColumnGroupElement,
         [CommentsPlugin.key]: CommentLeaf,
         [DatePlugin.key]: DateElement,
         [EmojiInputPlugin.key]: EmojiInputElement,
         [ExcalidrawPlugin.key]: ExcalidrawElement,
         [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
         [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
         [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
         [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
         [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
         [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
         [HighlightPlugin.key]: HighlightLeaf,
         [HorizontalRulePlugin.key]: HrElement,
         [ImagePlugin.key]: ImageElement,
         [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
         [KbdPlugin.key]: KbdLeaf,
         [LinkPlugin.key]: LinkElement,
         [ListItemPlugin.key]: withProps(PlateElement, { as: 'li' }),
         [MediaEmbedPlugin.key]: MediaEmbedElement,
         [MentionInputPlugin.key]: MentionInputElement,
         [MentionPlugin.key]: MentionElement,
         [NumberedListPlugin.key]: withProps(ListElement, { variant: 'ol' }),
         [ParagraphPlugin.key]: ParagraphElement,
         [SlashInputPlugin.key]: SlashInputElement,
         [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
         [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
         [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
         [TableCellHeaderPlugin.key]: TableCellHeaderElement,
         [TableCellPlugin.key]: TableCellElement,
         [TablePlugin.key]: TableElement,
         [TableRowPlugin.key]: TableRowElement,
         [TocPlugin.key]: TocElement,
         [TogglePlugin.key]: ToggleElement,
         [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
      }),
      plugins: [
         ...copilotPlugins,
         ...editorPlugins,
         FixedToolbarListPlugin,
         FloatingToolbarPlugin,
      ],
      value: [
         {
            children: [{ text: 'Playground' }],
            type: 'h1',
         },
         {
            children: [
               { text: 'A rich-text editor with AI capabilities. Try the ' },
               { bold: true, text: 'AI commands' },
               { text: ' or use ' },
               { kbd: true, text: 'Cmd+J' },
               { text: ' to open the AI menu.' },
            ],
            type: ParagraphPlugin.key,
         },
      ],
   })
}
