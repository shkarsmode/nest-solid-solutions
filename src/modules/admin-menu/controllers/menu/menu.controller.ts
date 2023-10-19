import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { INestedTreeNode } from '../../responses/nested-tree-node';


@Controller('menu')
export class MenuController {
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    public async getProfile(): Promise<INestedTreeNode[]> {
        return TREE_DATA
    }
}

const TREE_DATA: INestedTreeNode[] = [
    {
        name: 'Contents',
        children: [
            { 
                name: 'Pages',
                href: '/admin/grid/content/pages' 
            },
            { 
                name: 'Posts',
                href: '/admin/grid/content/posts' 
            },
            { 
                name: 'Comments',
                href: '/admin/grid/content/comments'
            },
        ],
    },
    {
        name: 'Users',
        icon: 'perm_identity',
        children: [
            { 
                name: 'Admin',
                icon: 'manage_accounts',
                href: '/admin/grid/accounts/admins'
            },
            { 
                name: 'Users',
                icon: 'face',
                href: '/admin/grid/accounts/users'
            }
        ],
    },
    {
        name: 'Settings',
        icon: 'settings',
        children: [
            { 
                name: 'General',
                href: '/admin/form/settings/general'
            }, 
            { 
                name: 'Catalog',
                href: '/admin/form/settings/catalog'
            }
        ]
    }
];